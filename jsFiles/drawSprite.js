

function drawSprite(gl,o){
    this.gl = gl;
    this.x = o.x || 0;
    this.y = o.y || 0;
    this.width = o.width|| 100
    this.height =o.height ||100
    this.positions = new Float32Array([this.x,this.y, this.x+this.width, this.y,
				      this.x+this.width, this.y+this.height, this.x, this.y+this.height])
    this.indices = new Uint16Array([0,1,2,1,2,3]);
    this.textcoord = new Float32Array([1,1,0,1,1,0,0,0])
    this.program = createProgram(gl, this.vertexCode, this.fragmentCode)
    this.setup();
    this.texMap = document.getElementById('test')//this.createTexture(gl,document.getElementById('test'))

}


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

drawSprite.prototype.createTexture = function(gl,src){
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

      const level = 0;
      const internalFormat = gl.RGBA;
      const width = 1;
      const height = 1;
      const border = 0;
      const srcFormat = gl.RGBA;
      const srcType = gl.UNSIGNED_BYTE;
      const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);

      const image = new Image();
      image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      srcFormat, srcType, image);


        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {

           gl.generateMipmap(gl.TEXTURE_2D);
        } else {

           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
      };
      image.src = src;

      return texture;
}

drawSprite.prototype.setup = function(){
    gl = this.gl
    var locations = {};
    this.locations = locations;
    this.locations.texture = gl.getUniformLocation(this.program, 'texture');

    var attributes = {};
    this.attributes = attributes;
    attributes.position = gl.getAttribLocation(this.program, 'position');
    attributes.textcoord = gl.getAttribLocation(this.program, 'textcoord');

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions,gl.STATIC_DRAW);

    this.uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.textcoord,gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
}

drawSprite.prototype.draw = function(){
    var program = this.program;
    var locations = this.locations;
    var attributes = this.attributes;

    gl = this.gl;
    gl.useProgram(program);

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texMap)
    gl.uniform1i(locations.texture,0)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer)
    gl.vertexAttribPointer(attributes.position,2,gl.FLOAT, false,0,0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.enableVertexAttribArray(attributes.position)

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer)
    gl.vertexAttribPointer(attributes.textcoord,2,gl.FLOAT, false,0,0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.enableVertexAttribArray(attributes.textcoord)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    gl.drawElements(gl.TRIANGLES, this.indices.length,gl.UNSIGNED_SHORT,0)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null)

    gl.disableVertexAttribArray(attributes.position)
    gl.disableVertexAttribArray(attributes.textcoord)
}


drawSprite.prototype.vertexCode =
'precision highp float;\n'+
'attribute vec2 position;\n'+
'attribute vec2 textcoord;\n'+
'\n'+
'varying vec2 textVarying;\n'+
'\n'+
'void main()\n'+
'{\n'+
'vec4 final = vec4(position,0.0,1.0);\n'+
'gl_Position = final;\n'+
'textVarying = textcoord;\n'+
'}'

drawSprite.prototype.fragmentCode =
'precision highp float;\n'+
'\n'+
'uniform sampler2D texturemap;\n'+
'\n'+
'varying vec2 textVarying;\n'+
'\n'+
'void main(void)\n'+
'{\n'+
'vec4 tcolor = texture2D(texturemap,textVarying);\n'+
'\n'+
'vec4 ncolor = tcolor;\n'+
'float luminance = 0.299*ncolor.r+0.587*ncolor.g+0.114*ncolor.b;\n'+
'gl_FragColor = vec4(ncolor.r, ncolor.g,ncolor.b,luminance*ncolor.a*ncolor.a);\n'+
'}\n';
