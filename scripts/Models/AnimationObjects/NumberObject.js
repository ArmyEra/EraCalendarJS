class NumberObject extends ImageObject{
    constructor(scrollControllers, position, width, height, spriteSheets, sheetIndex = 0){
        super(position, width, height, spriteSheets, sheetIndex);
        
        this.mouse = scrollControllers.mouse;
        this.locker = scrollControllers.locker;

        window.addEventListener("mousewheel", this.onScrollDetected.bind(this));
    }

    updateIndex(index){
        this.sheetIndex = index;
    }

    onScrollDetected(e){
        if(this.locker.State)
            return;

        if(!this.mouseOnMe(this.mouse.position))
            return;

        let sign = Math.sign(e.wheelDelta);
        this.shift = ClampValue(this.shift + sign, this.spriteSheets.length);    
    }
}