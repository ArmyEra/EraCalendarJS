var Animation = function(frameSet, delay)
{
    this.count = 0;
    this.directionUpdate = 1;
    this.delay = delay;
    this.frame = 0;
    this.frameIndex = 0;
    this.frameSet = frameSet;
}

Animation.prototype = {
    change:function(frameSet, delay = 15){
        if(this.frameSet != frameSet){
            this.count = 0;
            this.directionUpdate = 1;
            this.delay = delay;
            this.frameIndex = 0;
            this.frameSet = frameSet;
            this.frame = this.frameSet[this.frameIndex];
        }
    },    
    update:function(){
        this.count++;
        if(this.count >= this.delay){
            this.count = 0;
            if(this.frameIndex == FRAMES_COUNT_APPEAR){
                this.directionUpdate = 1;    
            }
            else if(this.frameIndex == this.frameSet.length -1){
                this.directionUpdate = -1;
            }
            this.frameIndex += this.directionUpdate;
            this.frame = this.frameSet[this.frameIndex];
        }
    }
}