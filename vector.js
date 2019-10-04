function Vector(x, y){
    this.x = x;
    this.y = y;

    this.render = () => {
        stroke(255);
        line(0,0, this.x, this.y);
    }

    this.add = (vec) => {
        return new Vector(this.x += vec.x, this.y += vec.y);
    }
    this.sub = (vec) => {
        return new Vector(this.x -= vec.x, this.y -= vec.y);
    }
    this.mult = (number) => {
        return new Vector(this.x*number, this.y*number);
    }

}