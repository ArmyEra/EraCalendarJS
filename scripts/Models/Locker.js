const IMAGE_FOLDER_SOURCE = "resources/images/locker"
const IMAGE_SOURCES = [`${IMAGE_FOLDER_SOURCE}/unlocked.png`,`${IMAGE_FOLDER_SOURCE}/locked.png`]

class Locker{
    constructor(state, bufferCanvas, mouse){
        this.bufferCanvas = bufferCanvas; 
        this.mouse = mouse;
        this.index = state ? 1 : 0;
        this.image = new Image();
        this.isInitialized = false;
        this.position = new Position([0, 0]);

        this.image.addEventListener("load", this.onImageLoad.bind(this));
        this.image.src = IMAGE_SOURCES[this.index];
    }

    get State(){
        return this.index == 1;
    }
    set State(value){
        this.index = value ? 1 : 0;
        this.image.src = IMAGE_SOURCES[this.index];
    }

    get MinPosition(){
        return this.position;
    }

    get MaxPosition(){
        return new Position([this.position.x + this.image.width, this.position.y + this.image.height]);
    }

    onImageLoad(event){
        this.isInitialized = true;
        this.position = new Position([this.bufferCanvas.width - this.image.width, this.bufferCanvas.height - this.image.height]);
        window.addEventListener("mouseup", this.onMouseClick.bind(this));
    }

    bufferize(buffer){
        if(!this.isInitialized)
            return;

        buffer.drawImage(this.image, 0, 0, this.image.width, this.image.height, 
            this.position.x, this.position.y, this.image.width, this.image.height); 
    }

    onMouseClick(e){
        if(e.button != 0)//left
            return;
        
        if(!this.mouseOnMe(this.mouse.position))
            return;

        this.State = !this.State;
    }

    mouseOnMe(mousePosition){
        var minPos = this.MinPosition;
        var maxPos = this.MaxPosition;

        return minPos.x <= mousePosition.x && mousePosition.x <= maxPos.x
            && minPos.y <= mousePosition.y && mousePosition.y <= maxPos.y;
    }
}