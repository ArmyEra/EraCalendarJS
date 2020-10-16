function mainInvoke() { 
    "use strict";    
    
    let display, buffer, imagesLoaded = 0;
    let loop, render, resize, onImageLoaded;

    let mouseController, lockerController;
    
    let scrollControllers;

    let imageObjects = [], locker;

    let numericSpriteSheets = Range(10, 0, (index) => SpriteSheet.CreateDefault());
    let pointSpriteSheet = SpriteSheet.CreateDefault();
    let doublePointsSheet = SpriteSheet.CreateDefault();
    let rectangleSpriteSheet = SpriteSheet.CreateDefault();

    // let rectangleObject = new ImageObject(
    //     new Position([80, 54]),
    //     640, 160,
    //     [rectangleSpriteSheet]
    // );

    //let imageObjects = [rectangleObject, dateValue, timeValue]//, secondPointObject, doublePointsObject];
    
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
        scrollControllers.bufferize(buffer);

        //Draw canvas at window
        display.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, display.canvas.width, display.canvas.height);
    }

    resize = function(){
        display.canvas.width = document.documentElement.clientWidth;        
        display.canvas.height = display.canvas.width * 0.5;
        display.imageSmoothingEnabled = false;
    }

    onImageLoaded = function(event){
        if(++imagesLoaded == TOTAL_IMAGES){
            window.requestAnimationFrame(loop);
            //new Music();
        }
    }

    //Initialize

    buffer = document.createElement("canvas").getContext("2d");
    display = document.querySelector("canvas").getContext("2d");

    buffer.canvas.width = 640;
    buffer.canvas.height = 480;
    
    window.addEventListener("resize", resize);
    resize();


    mouseController = new Mouse(buffer.canvas, display.canvas,"resources/images/mouse-pointer.png");
    lockerController = new Locker(true, buffer.canvas, mouseController);
    scrollControllers = {
        mouse : mouseController,
        locker : lockerController,        

        bufferize(buffer){
            this.locker.bufferize(buffer);
            this.mouse.bufferize(buffer);
        }
    };    

    let dateValue = new DateValue(scrollControllers,
        new Position([2, 100]), 
        SPRITE_SIZE, SPRITE_SIZE,
        numericSpriteSheets);//, pointSpriteSheet);

    let timeValue = new TimeValue(scrollControllers,
        new Position([104, 93*2 + 100]), 
        SPRITE_SIZE, SPRITE_SIZE,
        numericSpriteSheets);//, doublePointsSheet);

    imageObjects.push(dateValue); 
    imageObjects.push(timeValue);
 
    //pointSpriteSheet.image.addEventListener("load", onImageLoaded);
    // doublePointsSheet.image.addEventListener("load", onImageLoaded);
    // rectangleSpriteSheet.image.addEventListener("load", onImageLoaded);
    numericSpriteSheets.forEach(sheet => {
        sheet.image.addEventListener("load", onImageLoaded);    
    });
    
    //pointSpriteSheet.image.src = "resources/images/signes/point.png";
    // doublePointsSheet.image.src = "resources/images/signes/doublePoints.png";
    // rectangleSpriteSheet.image.src = "resources/images/rectangle.png";
    for(let i =0; i < numericSpriteSheets.length; i++)
        numericSpriteSheets[i].image.src = `resources/images/numbers/${i}.png`;
};
mainInvoke();