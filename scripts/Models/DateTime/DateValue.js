class DateValue{
    constructor(startPosition, width, height, numericSpriteSheets, pointSpriteSheet){
        var dateTime = new Date();
        var days = dateTime.getDate();
        var months = dateTime.getMonth() + 1;
        var years = dateTime.getFullYear();
        
        var invokeDelay = SECONDS_IN_MINUTE + 1 - dateTime.getSeconds();

        this.firstDay = new NumberObject(
            startPosition, 
            width, height,
            numericSpriteSheets.slice(0, 4), 
            Math.floor(days / 10));

        this.secondDay = new NumberObject(
            new Position([startPosition.x + width, startPosition.y]),
            width, height,
            numericSpriteSheets,
            days % 10);

        this.firstPoint = new ImageObject(
            new Position([startPosition.x + (1.85 * width), startPosition.y]),
            130, 130,
            [pointSpriteSheet]
        )

        this.firstMonth = new NumberObject(
            new Position([startPosition.x + (2.85 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 2), 
            Math.floor(months / 10));

        this.secondMonth = new NumberObject(
            new Position([startPosition.x + (3.85 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            months % 10);

        this.secondPoint = new ImageObject(
            new Position([startPosition.x + (4.7 * width), startPosition.y]),
            130, 130,
            [pointSpriteSheet]
        )

        this.firstYear = new NumberObject(
            new Position([startPosition.x + (5.7 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 4), 
            Math.floor(years / 1000));

        this.secondYear = new NumberObject(
            new Position([startPosition.x + (6.7 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            Math.floor(years / 100) % 10);

        this.thirdYear = new NumberObject(
            new Position([startPosition.x + (7.7 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets, 
            Math.floor(years / 10) % 10);

        this.fourthYear = new NumberObject(
            new Position([startPosition.x + (8.7 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            years % 10);
    
        setTimeout(this.updateIndex.bind(this), invokeDelay * MILISECONDS_IN_SECOND);
    }

    get imageObjects(){
        return [this.firstPoint, this.secondPoint,
             this.firstDay, this.secondDay, 
             this.firstMonth, this.secondMonth,
            this.firstYear, this.secondYear, this.thirdYear, this.fourthYear];
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

        var days = dateTime.getDate();
        var months = dateTime.getMonth() + 1;
        var years = dateTime.getFullYear();

        this.firstDay.updateIndex(Math.floor(days / 10));
        this.secondDay.updateIndex(days % 10);
        this.firstMonth.updateIndex(Math.floor(months / 10));
        this.secondMonth.updateIndex(months % 10);
        this.firstYear.updateIndex(Math.floor(years / 1000));
        this.secondYear.updateIndex(Math.floor(years / 100)% 10);
        this.thirdYear.updateIndex(Math.floor(years / 10)% 10);
        this.fourthYear.updateIndex(years % 10);

        setTimeout(this.updateIndex.bind(this), SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND);
    }
}