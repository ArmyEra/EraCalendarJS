class Music{
    constructor(){
        setTimeout(this.soundClick.bind(this), MILISECONDS_IN_SECOND);
    }

    getDate(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '_' + dd + '_' + yyyy;
        return today;
    }

    soundClick()
    {
        console.log(this.getDate());
        // scr = "resources/sounds/sound.mp3";
        // var audio2 = new Audio(scr);
        // audio2.play();
        setTimeout(this.soundClick.bind(this), SECONDS_IN_HOUR * MILISECONDS_IN_SECOND);
    }
}