class Position{
    constructor(options){
        this.x = options[0],
        this.y = options[1]
    }   
}

class SpriteSheet{
    constructor(frameSet){
        this.frameSet = frameSet;
        this.image = new Image();
    }
}