class Position{
    constructor(options){
        this.x = options[0],
        this.y = options[1]
    }

    update(newX, newY){
        this.x = newX;
        this.y = newY;
    }
}

class SpriteSheet{
    constructor(frameSet){
        this.frameSet = frameSet;
        this.image = new Image();
    }

    static CreateDefault(){
        return new SpriteSheet(Range(FRAMES_COUNT_TOTAL));
    }
}