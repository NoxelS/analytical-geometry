function Achse(dir){

    this.render = () => {
        if(dir == 'x'){
            stroke('#EFD6AC');
            line(-windowWidth/2,0, windowWidth/2, 0);
        }else{
            stroke('#EFD6AC');
            line(0, -windowHeight/2,0, windowHeight/2);
        }
    }
}

