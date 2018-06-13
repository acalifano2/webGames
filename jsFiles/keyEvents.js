

/*
    change code BELOW
        key events are now gonna be non document event, they will be canvas keyEvents
        separate movement to up and keydown

        set up templates for a few things
            keydown -move webgl canvas along x and y directions based on WASD and arrows
            keyup
            keypress
            mousedown --same as keydown
            mouseup
            mousemove --this will be most important part of the dragging the canvas BACKGROUND

            SETUP XBOX CONTROLLER DETECTION
            http://html5gamepad.com/

                site will help map codes to controller buttons
*/

/*
    https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
*/
function movement(event){
    if (event.keyCode === 38 || event.keyCode === 87){
    	console.log(event.key);
    	// move sprite up
    }
    if (event.keyCode === 40 || event.keyCode === 83){
    	console.log(event.key);
    	// move sprite down
    }
    if (event.keyCode === 37 || event.keyCode === 65){
    	console.log(event.key);
    	// move sprite left
    }
    if (event.keyCode === 39 || event.keyCode === 68){
    	console.log(event.key);
    	// move sprite right
    }
    if (event.keyCode === 32){
    	console.log(event.key);
    	// sprite shoots
    }
}
