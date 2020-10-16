const DEFAULT_DELAY = 15;

class Animation{
    constructor(){
        this.count = 0;
        this.delay = DEFAULT_DELAY;
        this.frame = 0;
        this.frameIndex = 0;
        this.frameSet = undefined;
    }

    change(frameSet, delay = 15){
        if(this.frameSet == frameSet)
            return;

        this.count = 0;
        this.delay = delay;
        this.frameIndex = 0;
        this.frameSet = frameSet;
        this.frame = this.frameSet[this.frameIndex];
    }

    update(){
        this.count++;
        if(this.count < this.delay)
            return;
        this.count = 0;
        this.frameIndex = (this.frameIndex == this.frameSet.length -1)
            ? FRAMES_COUNT_APPEAR
            : this.frameIndex + 1;                
        this.frame = this.frameSet[this.frameIndex];
    }
}