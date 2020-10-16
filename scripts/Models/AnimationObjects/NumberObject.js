class NumberObject extends ImageObject{
    constructor(scrollControllers, container, position, width, height, spriteSheets, sheetIndex = 0){
        super(position, width, height, spriteSheets, sheetIndex);
        
        this.mouse = scrollControllers.mouse;
        this.locker = scrollControllers.locker;
        this.container = container;

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
        this.shift +=sign;
        this.container.updateIndex();
    }
}