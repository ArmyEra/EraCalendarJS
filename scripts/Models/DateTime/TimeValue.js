class TimeValue{
    constructor(scrollControllers, startPosition, width, height, numericSpriteSheets, pointSpriteSheet){
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var invokeDelay = SECONDS_IN_MINUTE + 1 - dateTime.getSeconds();

        this.firstHour = new NumberObject(scrollControllers, this,
            startPosition, 
            width, height,
            numericSpriteSheets.slice(0, 3), 
            Math.floor(hours / 10));
        this.secondHour = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + width, startPosition.y]),
            width, height,
            numericSpriteSheets,
            hours % 10);

        this.firstPoint = new ImageObject(
            new Position([startPosition.x + (2 * width + 2), startPosition.y]),
            42, 42,
            [pointSpriteSheet]
        )
        
        this.secondPoint = new ImageObject(
            new Position([startPosition.x + (2 * width + 2), startPosition.y+38]),
            42, 42,
            [pointSpriteSheet]
        )

        this.firstMinute = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (2.5 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 6), 
            Math.floor(minutes / 10));

        this.secondMinute = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (3.5 * width + 20), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            minutes % 10);

        setTimeout(this.updateIndex.bind(this, true), invokeDelay * MILISECONDS_IN_SECOND);
    }

    get imageObjects(){
        return [this.firstPoint, this.secondPoint,
            this.firstHour, this.secondHour, 
            this.firstMinute, this.secondMinute];
    }

    get TimeShifts(){
        return {
            hours: this.firstHour.shift * 10 + this.secondHour.shift,
            minutes : this.firstMinute.shift * 10 + this.secondMinute.shift
        }
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

    updateIndex(callTimeout = false){
        let timeShifts = this.TimeShifts;

        var dateTime = new Date()
            .addHours(timeShifts.hours)
            .addMinutes(timeShifts.minutes);
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();

        this.firstHour.updateIndex(Math.floor(hours / 10));
        this.secondHour.updateIndex(hours % 10);
        this.firstMinute.updateIndex(Math.floor(minutes / 10));
        this.secondMinute.updateIndex(minutes % 10);

        if(callTimeout)
            setTimeout(this.updateIndex.bind(this), SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND);
    }
}