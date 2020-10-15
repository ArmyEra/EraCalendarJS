(function() { "use strict";    
    
    const SPRITE_SIZE = 16;

    var Animation = function(frameSet, delay)
    {
        this.count = 0;
        this.delay = delay;
        this.frame = 0;
        this.frameIndex = 0;
        this.frameSet = frameSet;
    }

    Animation.prototype = {
        change:function(frameSet, delay = 15){
            if(this.frameSet != frameSet){
                this.count = 0;
                this.delay = delay;
                this.frameIndex = 0;
                this.frameSet = frameSet;
                this.frame = this.frameSet[this.frameIndex];
            }
        },    
        update:function(){
            this.count++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frameIndex = (this.frameIndex == this.frameSet.length -1) ? 0 : this.frameIndex + 1;
                this.frame = this.frameSet[this.frameIndex];
            }
        }
    }

    var buffer, controller, display, loop, player, render, resize, spriteSheet;

    buffer = document.createElement("canvas").getContext("2d");
    display = document.querySelector("canvas").getContext("2d");

    controller = {
        left: { active:false, state:false },
        right: { active:false, state:false },
        up: { active:false, state:false },

        keyUpDown:function(){
            var keyState = (event.type == "keydown") ? true : false;
            var controllerDirObject;
            switch(event.keyCode){
                case 37: //left
                    controllerDirObject = controller.left;
                    break;
                case 38://up
                    controllerDirObject = controller.up;
                    break;
                case 39:
                    controllerDirObject = controller.right;
                    break;
            }

            if(controllerDirObject.state != keyState)
                controllerDirObject.active = keyState;
            controllerDirObject.state = keyState;
        }
    }

    player = {
        animation: new Animation(),
        jumping:true,
        height: SPRITE_SIZE, width: SPRITE_SIZE,
        x: 0, y:40-18,
        xVelocity:0, yVelocity:0
    }

    spriteSheet = {
        frameSet:[[0, 1], [2, 3], [4, 5]],
        image: new Image()
    }

    loop = function(time_stamp){
        if(controller.up.active && !player.jumping){
            controller.up.active = false;
            player.jumping = true;
            player.yVelocity -=2.5;
        }

        if(controller.left.active){
            player.animation.change(spriteSheet.frameSet[2], 15);
            player.xVelocity -= 0.05;
        }

        if(controller.right.active){
            player.animation.change(spriteSheet.frameSet[1], 15);
            player.xVelocity += 0.05;
        }

        if(!controller.left.active && !controller.right.active)
            player.animation.change(spriteSheet.frameSet[0], 20);

        player.yVelocity += 0.25;

        player.x += player.xVelocity;
        player.y += player.yVelocity;
        player.xVelocity *= 0.9
        player.yVelocity *= 0.9

        if(player.y + player.height > buffer.canvas.height -2)
        {
            player.jumping = false;
            player.y = buffer.canvas.height -2 - player.height;
            player.yVelocity = 0;
        }

        if(player.x + player.width < 0)
            player.x = buffer.canvas.width;
        else if(player.x > buffer.canvas.width)
            player.x = -player.width;

        player.animation.update();

        render();

        window.requestAnimationFrame(loop);

    }

    render = function(){
        //Draw background
        buffer.fillStyle = "#7ec0ff";
        //buffer.fillStyle = "000000";
        buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
        buffer.strokeStyle = "#8ed0ff";
        buffer.lineWidth = 10;
        buffer.beginPath();
        buffer.moveTo(0, 0);
        buffer.bezierCurveTo(40, 20, 40, 0, 80, 0);
        buffer.moveTo(0, 0);
        buffer.bezierCurveTo(40, 20, 40, 20, 80, 0);
        buffer.stroke();
        buffer.fillStyle = "#009900";
        buffer.fillRect(0, 36, buffer.canvas.width, 4);

        buffer.drawImage(spriteSheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);
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

    buffer.canvas.width = 80;
    buffer.canvas.height = 40;

    window.addEventListener("resize", resize);
    // window.addEventListener("keydown", controller.keyUpDown);
    // window.addEventListener("keyup", controller.keyUpDown);

    resize();
    spriteSheet.image.addEventListener("load", function(event){
        window.requestAnimationFrame(loop);
    });

    spriteSheet.image.src = "resources/animationSheet.png";
})();