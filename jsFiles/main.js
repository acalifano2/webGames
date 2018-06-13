/*
    1. round those border edges
    2. fill it with a gradient
    3. fill it with a texture, that'll be our background. possibly make one

    3.5 add sounds, pick some ambient music

    4. MAKE BACKGROUND WHITE, comment our your current background
    5. draw me a TRIANGLe
    6. draw me a square
    6.5: take that gradient canvas and turn it into a WEBGL texture, then use that for 3 but don't throw away the pretty pic, may still use it
      webgl binds values ato element array buffer -> indicies

     6.75-6.99
     Build a connect n game in webgl and javascript, possibly with server connection later
        for animating the drop of the textures with possible bounce, write code to interpolate between points
    

    MONDAY&&&&&&&&&&&&&&&&&&
    7. draw me a textured square, our character( first with transparency)
    8. draw me one without transparency
    9. have it move across the screen
    10. have it move according to physics rather than displacement
        not x =x +10
        not y = y+10
        if D is pushed, =>, you change the character's positive x velocity optionValue
    11. add gravity
    12. prevent spirte from leaving screen
    13. collision with another sprite
    14. move through a sprite sheet & DESIGN A SPRITE STATE MACHINE
    15. interpolation VS extrapolation
    16. you're gonna interpolate the animations
    17. you're gonna do particle effects


    IMPROVE BELOW code

    int main(){
        int x =0;
        for(int i=0;i<1000;i++){
            x = x*0+1;
        }
        return 0;
    }
    //------------------------------------------------------------------------------------------------------------------//
        BIT WISE MANIPULATION

    //three more functions
        1. binary search
        2. write fizzbuzz in ruby, write a bubble sort in ruby
        3. write a hashtable in C
        3.5: write a base converter in c
            decimal to binary
            binary to decimal
            decimal to hex
            hex to decimal
        4. code to make a new directory and then save to it
        5. code to parse this string and return a set of strings
            input string: "{x=10,y=15,z=10,width=100,height=200, velocity={1.5,2.5,3.4}, accelerationVec={0.7,6.5,3.4}}"

            outputstring:
                x=10
                y=15
                z=10
                width=100
                height=200
                velocity[1] = 1.5
                velocity[2]=2.5
                velocity[3]=3.4
                accelerationVec[1]=0.7
                accelerationVec[2]=6.5
                accelerationVec[3]=3.4
*/







/*
webSocket.onopen(){
    console.log("NEW CONNECTION")
    webSocket.send("GOT A CONNECTION")
}

webSocket.onclose(){
    console.log("CLOSING CONNECTION")
    webSocket.send("CLOSING CONNECTION")
    webSocket.close()
}

webSocket.onmessage(event.data){
    if(typeof event.data === "string" && event.data == "CONNECTION"){
        alert("WE CONNECTED")
    }
}
*/



//TRIANGLE WebGL
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';


function main(){
    //var canvas = document.getElementById('green')
    //canvas.width = 1024
    //canvas.height = 760
    //var keyInput = new KeyInput()
    document.addEventListener('keydown', movement)
    document.addEventListener('keyup', movement)

//WebGL
    var gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log("ERROR initializing shaders");
    }

    var n = initVertexBuffers(gl);

    gl.drawArrays(gl.TRIANGLES, 0, n);


    //var gl = WebGLUtils.create3DContext(canvas)
    //WebGLDebugUtils.init(gl)
  //  sprite = new drawSprite(gl,{})
    //sprite.draw()
    //webSocket = new WebSocket("ws://$ipaddr:$port/info");
    //webSocket.binaryType = "arraybuffer"

    //webSocket.onopen()
    //webSocket.onmessage()


    //tickHandler()
    //webSocket.onclose()

}

function initVertexBuffers(gl) {
  var verticies = new Float32Array([
    0.0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3;

  return n;
}
