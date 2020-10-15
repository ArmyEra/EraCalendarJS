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