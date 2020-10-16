function mainInvoke() { 
    "use strict";    
    
    var display, buffer, imagesLoaded = 0;
    var loop, render, resize, onImageLoaded;

    var numericSpriteSheets = Range(10, 0, (index) => SpriteSheet.CreateDefault());
    var pointSpriteSheet = SpriteSheet.CreateDefault();
    var doublePointsSheet = SpriteSheet.CreateDefault();
    var rectangleSpriteSheet = SpriteSheet.CreateDefault();

    var rectangleObject = new ImageObject(
        new Position([319, 188]),
        1282, 258,
        [rectangleSpriteSheet]
    );

    var dateValue = new DateValue(
        new Position([325, 188+64]), 
        SPRITE_SIZE, SPRITE_SIZE,
        numericSpriteSheets, pointSpriteSheet);

    var timeValue = new TimeValue(
        new Position([641.5, 634]), 
        SPRITE_SIZE, SPRITE_SIZE,
        numericSpriteSheets, doublePointsSheet);

    var imageObjects = [rectangleObject, dateValue, timeValue]//, secondPointObject, doublePointsObject];

    buffer = document.createElement("canvas").getContext("2d");
    display = document.querySelector("canvas").getContext("2d");

    loop = function(time_stamp){
        imageObjects.forEach(imageObject => {
            imageObject.change(FRAME_RATE);
            imageObject.update();
        });

        render();
        window.requestAnimationFrame(loop);
    }

    render = function(){
        //Draw background
        buffer.fillStyle = "000000";
        buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);
        
        //Draw numbers ar canvas
        imageObjects.forEach((imageObject) => {
            imageObject.bufferize(buffer);
        })

        //Draw canvas at window
        display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);
    }

    resize = function(){
        display.canvas.width = document.documentElement.clientWidth;
        // if(display.canvas.width > document.documentElement.clientHeight)
        //     display.canvas.width = document.documentElement.clientHeight;
        
        display.canvas.height = display.canvas.width * 0.5;
        display.imageSmoothingEnabled = false;
    }

    onImageLoaded = function(event){
        if(++imagesLoaded == TOTAL_IMAGES){
            window.requestAnimationFrame(loop);
            new Music();
        }
    }

    //Initialize

    buffer.canvas.width = 1920;
    buffer.canvas.height = 1080;

    window.addEventListener("resize", resize);
    resize();

    pointSpriteSheet.image.addEventListener("load", onImageLoaded);
    doublePointsSheet.image.addEventListener("load", onImageLoaded);
    rectangleSpriteSheet.image.addEventListener("load", onImageLoaded);
    numericSpriteSheets.forEach(sheet => {
        sheet.image.addEventListener("load", onImageLoaded);    
    });
    
    pointSpriteSheet.image.src = "resources/images/signes/point.png";
    doublePointsSheet.image.src = "resources/images/signes/doublePoints.png";
    rectangleSpriteSheet.image.src = "resources/images/rectangle.png";

    for(var i =0; i < numericSpriteSheets.length; i++)
        numericSpriteSheets[i].image.src = `resources/images/numbers/${i}.png`;

    
};

mainInvoke();