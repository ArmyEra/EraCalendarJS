    function musik_test(){
        function  date (){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '_' + dd + '_' + yyyy;
        return today;
        };


        data = date();

        setTimeout(soundClick, 15000);



        function  soundClick()
        {
            scr = "resources/sounds/sound.mp3";
            var audio2 = new Audio(scr);
            audio2.play();
        }

    };