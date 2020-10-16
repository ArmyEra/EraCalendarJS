class NumberObject extends ImageObject{
    constructor(position, width, height, spriteSheets, sheetIndex = 0){
        super(position, width, height, spriteSheets, sheetIndex);
    }

    updateIndex(index){
        this.sheetIndex = index;
    }
}

class UpdateDelayObject{
    constructor(options){
        this.startDelay = options[0],
        this.updateDelay = options[1]
    }
}