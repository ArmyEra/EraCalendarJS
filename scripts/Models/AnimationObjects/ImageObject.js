class ImageObject{
    constructor(position, width, height, spriteSheets, sheetIndex = 0){
        this.animation = new Animation(),
        this.spriteSheets = spriteSheets,
        this.sheetIndex = sheetIndex,
        this.shift = 0,
        this.width = width,
        this.height = height,
        this.position = position
    }

    get MinPosition(){
        return this.position;
    }

    get MaxPosition(){
        return new Position([this.position.x + this.width, this.position.y + this.height]);
    }

    mouseOnMe(mousePosition){
        var minPos = this.MinPosition;
        var maxPos = this.MaxPosition;

        return minPos.x <= mousePosition.x && mousePosition.x <= maxPos.x
            && minPos.y <= mousePosition.y && mousePosition.y <= maxPos.y;
    }

    change(delay = 15){
        let index = this.sheetIndex;
        var newFrameSet = this.spriteSheets[index].frameSet;
        this.animation.change(newFrameSet, delay);
    }    

    update(){
        this.animation.update();
    }

    bufferize(buffer){
        let image = this.spriteSheets[this.sheetIndex].image;
        buffer.drawImage(image, 0, this.animation.frame * this.height, this.width, this.height, 
            Math.floor(this.position.x), Math.floor(this.position.y), this.width, this.height); 
    }    

    static GenerateArray(positions, width, height, spriteSheetsArray){
        var length = Math.min(positions.length, spriteSheetsArray.length);
        var instances = new Array(length);
        for(var i = 0; i < length; i++)
            instances[i] = new ImageObject(positions[i], width, height, spriteSheetsArray[i]);

        return instances;
    }
}