function mainInvoke() { "use strict";    
    var buffer, display, loop, render, resize;

    buffer = document.createElement("canvas").getContext("2d");
    display = document.querySelector("canvas").getContext("2d");

    var spriteSheet = new SpriteSheet(Range(FRAMES_COUNT));
    var imageNumbers = ImageObject.GenerateArray(
        Range(2, 0,index => new Position([index * SPRITE_SIZE, 0])), 
        Repeat(spriteSheet, 2));

    loop = function(time_stamp){
        imageNumbers.forEach(imageNumber => {
            imageNumber.change(10);
            imageNumber.update();
        });

        render();
        window.requestAnimationFrame(loop);
    }

    render = function(){
        //Draw background
        buffer.fillStyle = "000000";
        buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
        
        //Draw numbers ar canvas
        imageNumbers.forEach((player) => {
            buffer.drawImage(spriteSheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE); 
        })

        //Draw canvas at window
        display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);
    }

    resize = function(){
        display.canvas.width = document.documentElement.clientWidth - 32;
        if(display.canvas.width > document.documentElement.clientHeight)
            display.canvas.width = document.documentElement.clientHeight;
        
        display.canvas.height = display.canvas.width * 0.5;
        display.imageSmoothingEnabled = false;
    }

    //Initialize

    buffer.canvas.width = 360;
    buffer.canvas.height = 180;

    window.addEventListener("resize", resize);

    resize();
    spriteSheet.image.addEventListener("load", function(event){
        window.requestAnimationFrame(loop);
        musik_test();
    });

    spriteSheet.image.src = "resources/images/testSheet.png";
};

mainInvoke();