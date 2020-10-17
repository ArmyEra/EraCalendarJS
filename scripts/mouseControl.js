const IMAGE_OFFSET_X = -18;
const IMAGE_OFFSET_Y = -2;
const REVERT_SCALE_X = false;
const REVERT_SCALE_Y = false;

class Mouse{
    constructor(bufferCavas, displayCanvas, imagePath){
        this.buffer = bufferCavas,
        this.display = displayCanvas;
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        this.image = new Image();
        this.position = new Position([0,0])

        this.isInitialized = false;
        this.loadImage(imagePath);
    }

    resize(){
        this.scaleX = this.buffer.width / this.display.width;
        this.scaleY = this.buffer.height / this.display.height;
    }

    loadImage(path){
        this.image.addEventListener("load", this.onImageLoad.bind(this));
        this.image.src = path;
    }

    onImageLoad(event){
        window.addEventListener("mousemove", this.mouseMove.bind(this));
        this.isInitialized = true;
    }

    mouseMove(e){
        this.position.update(
            REVERT_SCALE_X
                ? this.buffer.width - (e.pageX + IMAGE_OFFSET_X) * this.scaleX
                : (e.pageX + IMAGE_OFFSET_X) * this.scaleX,
            REVERT_SCALE_Y
                ? this.buffer.height - (e.pageY + IMAGE_OFFSET_Y) * this.scaleY
                : (e.pageY + IMAGE_OFFSET_Y) * this.scaleY
        );
    }

    bufferize(buffer){
        if(!this.isInitialized)
            return;

        buffer.drawImage(this.image, 0, 0, this.image.width, this.image.height, 
            this.position.x, this.position.y, this.image.width, this.image.height); 
    }
} 