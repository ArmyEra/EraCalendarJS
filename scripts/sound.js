class Music{
    constructor(dateContainer, locker){
        this.dateContainer = dateContainer;
        this.locker = locker;
        window.addEventListener("mouseup", this.onMouseClick.bind(this));
        setTimeout(this.soundClick.bind(this, true), MILISECONDS_IN_SECOND);
    }

    get FileNameFromDate(){
        var today = this.dateContainer === null
            ? new Date()
            : this.dateContainer.ShiftedDate; 
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

        console.log("TODO: rewrite all names in resources/sounds without year")
        today = `${dd}_${mm}`;
        return today;
    }

    soundClick(repeat = false)
    {
        console.log("Click")
        var scr = `resources/sounds/${this.FileNameFromDate}.wav`;
         
         var audio = new Audio(scr);
         audio.play();

         if(repeat)
            setTimeout(this.soundClick.bind(this), SECONDS_IN_HOUR * MILISECONDS_IN_SECOND);
    }

    onMouseClick(e){
        if(e.button != 1)//central
            return;

        if(this.locker === null || !this.locker.State)
            return;

        this.soundClick();
    }
}