class DateValue{
    constructor(scrollControllers, startPosition, width, height, numericSpriteSheets, pointSpriteSheet){
        var dateTime = new Date();
        var days = dateTime.getDate();
        var months = dateTime.getMonth() + 1;
        var years = dateTime.getFullYear();
        
        var invokeDelay = SECONDS_IN_MINUTE + 1 - dateTime.getSeconds();

        this.firstDay = new NumberObject(scrollControllers, this,
            startPosition, 
            width, height,
            numericSpriteSheets.slice(0, 4), 
            Math.floor(days / 10));

        this.secondDay = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + width, startPosition.y]),
            width, height,
            numericSpriteSheets,
            days % 10);

        this.firstPoint = new ImageObject(
            new Position([startPosition.x + (2 * width + 2), startPosition.y+38]),
            42, 42,
            [pointSpriteSheet]
        )

        this.firstMonth = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (2.5 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 2), 
            Math.floor(months / 10));

        this.secondMonth = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (3.5 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            months % 10);

        this.secondPoint = new ImageObject(
            new Position([startPosition.x + (4.5 * width + 2), startPosition.y+38]),
            42, 42,
            [pointSpriteSheet]
        )

        this.firstYear = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (5 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets.slice(0, 4), 
            Math.floor(years / 10) % 10);

        this.secondYear = new NumberObject(scrollControllers, this,
            new Position([startPosition.x + (6 * width), startPosition.y]), 
            width, height,
            numericSpriteSheets,
            years % 10);
    
        setTimeout(this.updateIndex.bind(this, true), invokeDelay * MILISECONDS_IN_SECOND);
    }

    get imageObjects(){
        return [this.firstPoint, this.secondPoint,
             this.firstDay, this.secondDay, 
             this.firstMonth, this.secondMonth,
            this.firstYear, this.secondYear];//, this.thirdYear, this.fourthYear];
    }

    get DateShifts(){
        return {
            days: this.firstDay.shift * 10 + this.secondDay.shift,
            months : this.firstMonth.shift * 10 + this.secondMonth.shift,
            years : this.firstYear.shift *10 + this.secondYear.shift
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
        var dateShifts = this.DateShifts;

        var dateTime = new Date()
            .addDays(dateShifts.days)
            .addMonths(dateShifts.months)
            .addYears(dateShifts.years);

        var days = dateTime.getDate();
        var months = dateTime.getMonth() + 1;
        var years = dateTime.getFullYear();

        this.firstDay.updateIndex(Math.floor(days / 10));
        this.secondDay.updateIndex(days % 10);
        this.firstMonth.updateIndex(Math.floor(months / 10));
        this.secondMonth.updateIndex(months % 10);
        this.firstYear.updateIndex(Math.floor(years / 10)% 10);
        this.secondYear.updateIndex(years % 10);

        if(callTimeout)
            setTimeout(this.updateIndex.bind(this), SECONDS_IN_MINUTE * MILISECONDS_IN_SECOND);
    }
}