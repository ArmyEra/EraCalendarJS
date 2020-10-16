class Music{
    constructor(){
        window.addEventListener("mouseup", this.onMouseClick.bind(this));
        setTimeout(this.soundClick.bind(this), MILISECONDS_IN_SECOND);
    }

    getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = `${dd}_${mm}_${yyyy}`;
        return today;
    }

    soundClick()
    {
         var name_file = this.getDate();
         name_file = String(name_file);
         console.log(name_file);
         var scr = "resources/sounds/" + name_file + ".wav";
         var audio2 = new Audio(scr);
         audio2.play();
        //setTimeout(this.soundClick.bind(this), SECONDS_IN_HOUR * MILISECONDS_IN_SECOND);
    }

    onMouseClick(e){
        if(e.button != 1)//central
            return;

        this.soundClick();
    }
}