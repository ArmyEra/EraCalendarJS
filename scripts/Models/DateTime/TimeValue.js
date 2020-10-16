class TimeValue{
    constructor(scrollControllers, startPosition, width, height, numericSpriteSheets){//, doublePointsSheet){
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var invokeDelay = SECONDS_IN_MINUTE + 1 - dateTime.getSeconds();

        this.firstHour = new NumberObject(scrollControllers,
            startPosition, 
            width, height,
            numericSpriteSheets.slice(0, 3), 
            Math.floor(hours / 10));
        this.secondHour = new NumberObject(scrollControllers,
            new Position([startPosition.x + width, startPosition.y]),
            width, height,
            numericSpriteSheets,
            hours % 10);

        // this.doublePoint = new ImageObject(
        //     new Position([startPosition.x + (1.9 * width), startPosition.y]),
        //     width, height,
        //     [doublePointsSheet]
        // )

        this.firstMinute = new NumberObject(scrollControllers,
            new Position([startPosition.x + (2 * width + 20), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 6), 
            Math.floor(minutes / 10));

        this.secondMinute = new NumberObject(scrollControllers,
            new Position([startPosition.x + (3 * width + 20), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            minutes % 10);

        setTimeout(this.updateIndex.bind(this), invokeDelay * MILISECONDS_IN_SECOND);
    }

    get imageObjects(){
        return [//this.doublePoint, 
            this.firstHour, this.secondHour, 
            this.firstMinute, this.secondMinute];
    }

    change(delay = 15){
        this.imageObjects.forEach(imageObject => {
            imageObject.change(delay);
        })
    }
    update(){
        this.imageObjects.forEach(imageObject => {
            imageObject.update();
        })
    }

    bufferize(buffer){
        this.imageObjects.forEach(imageObject => {
            imageObject.bufferize(buffer);
        })
    }

    updateIndex(){
        console.log("Called!");

        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();

        this.firstHour.updateIndex(Math.floor(hours / 10));
        this.secondHour.updateIndex(hours % 10);
        this.firstMinute.updateIndex(Math.floor(minutes / 10));
        this.secondMinute.updateIndex(minutes % 10);

        setTimeout(this.updateIndex.bind(this), SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND);
    }
}