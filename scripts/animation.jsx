(function() { "use strict";    
    
    const SPRITE_SIZE = 128;
    const FRAMES_COUNT = 4;

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

    var buffer, display, loop, render, resize;

    buffer = document.createElement("canvas").getContext("2d");
    display = document.querySelector("canvas").getContext("2d");

    class Position{
        constructor(options){
            this.x = options[0],
            this.y = options[1]
        }   
    }

    class SpriteSheet{
        constructor(frameSet){
            this.frameSet = frameSet;
            this.image = new Image();
        }
    }

    class ImageObject{
        constructor(position, spriteSheet){
            this.animation = new Animation(),
            this.spriteSheet = spriteSheet,
            this.width = SPRITE_SIZE,
            this.height = SPRITE_SIZE,
            this.x = position.x,
            this.y = position.y
        }

        change(delay = 15){
            this.animation.change(this.spriteSheet.frameSet, delay);
        }

        update(){
            this.animation.update();
        }

        static GenerateArray(positions, spriteSheets){
            var length = Math.min(positions.length, spriteSheets.length);
            var instances = new Array(length);
            for(var i = 0; i < length; i++)
                instances[i] = new ImageObject(positions[i], spriteSheets[i]);

            return instances;
        }
    }

    function Range(count, startIndex = 0, content){
        var result = [];
        if(typeof content == "function") {
            for(var i = 0; i < count; i++) {
                result.push(content(i));
            }
        } else {
            for(var i = 0; i < count; i++) {
                result.push(i);
            }
        }
        return result;
    }

    function Repeat(source, count){
        var result = [];
        for(var i = 0; i < count; i++)
            result.push(source)
        return result;
    }

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
    });

    spriteSheet.image.src = "resources/testSheet.png";
})();