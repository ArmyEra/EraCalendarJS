class ImageObject{
    constructor(position, width, height, spriteSheets, sheetIndex = 0){
        this.animation = new Animation(),
        this.spriteSheets = spriteSheets,
        this.sheetIndex = sheetIndex
        this.width = width,
        this.height = height,
        this.x = position.x,
        this.y = position.y
    }

    change(delay = 15){
        this.animation.change(this.spriteSheets[this.sheetIndex].frameSet, delay);
    }

    update(){
        this.animation.update();
    }

    bufferize(buffer){
        buffer.drawImage(this.spriteSheets[this.sheetIndex].image, 0, this.animation.frame * this.height, this.width, this.height, 
            Math.floor(this.x), Math.floor(this.y), this.width, this.height); 
    }

    static GenerateArray(positions, width, height, spriteSheetsArray){
        var length = Math.min(positions.length, spriteSheetsArray.length);
        var instances = new Array(length);
        for(var i = 0; i < length; i++)
            instances[i] = new ImageObject(positions[i], width, height, spriteSheetsArray[i]);

        return instances;
    }
}