function Gerade(a, b){
    this.a = a;
    this.b = b;
    this.index = GeradenArray.length;
    this.direction = this.b.copy().sub(this.a);

    this.render = () => {
        this.direction = this.b.copy().sub(this.a);
        
        // A Vektor
        strokeWeight(1); 
        stroke('#183A37');
        line(0,0,this.a.x,this.a.y);
        
        // Richtungsvektor
        stroke('#692534');
        strokeWeight(3); 
        line(this.a.x,this.a.y,this.a.x+this.direction.x,this.a.y+this.direction.y);
        
        // Restliche Länge
        stroke('#432534');
        strokeWeight(2); 
        line(this.a.x+this.direction.x,this.a.y+this.direction.y,this.calc(100).x,this.calc(100).y);
        line(this.a.x,this.a.y,this.calc(-100).x,this.calc(-100).y);

        // Spurpunkte
        fill('#C44900');
        stroke('#C44900');
        circle(this.s_0.x, this.s_0.y, 7);
        circle(this.s_1.x, this.s_1.y, 7);
        // Text
        textSize(15);
        textAlign(CENTER, CENTER);
        fill('#C44900')
        strokeWeight(0); 
        if(this.index != 0 && !(this.index == GeradenArray.length && onHold )){
            text(`(${Math.round(this.s_0.x*10)/100} | ${Math.round(-this.s_0.y*10)/100})`, this.s_0.x+70, this.s_0.y);
            text(`(${Math.round(this.s_1.x*10)/100} | ${Math.round(-this.s_1.y*10)/100})`, this.s_1.x, this.s_1.y+30);
        }
        strokeWeight(3); 

        //Schnittpunkte mit anderen Geraden
        // Wird in Draw berechnet
    }

    this.calc = (x) => {
        let _a = this.a.copy();
        let _d = this.direction.copy();
        return _a.add(_d.mult(x));
    }

    // Spurpunkte
    this.s_0 = this.calc(-this.a.x/this.direction.x);
    this.s_1 = this.calc(-this.a.y/this.direction.y);

    // Schnittpunkt mit anderen geradem
    this.schnittpunkt = (gerade) => {
        let x1 = this.a.x;
        let x2 = this.b.x;
        let x3 = gerade.a.x;
        let x4 = gerade.b.x;

        let y1 = this.a.y;
        let y2 = this.b.y;
        let y3 = gerade.a.y;
        let y4 = gerade.b.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
          return;
        }
    
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

        return createVector(this.calc(t).x, this.calc(t).y);

    }

    this.genText = () => {
        return `g_${this.index}: \\vec{x} = \\binom{${Math.round(this.a.x*10)/100}}{${-Math.round(this.a.y*10)/100}} + \\lambda \\cdot  \\binom{${Math.round(this.direction.x*10)/100}}{${-Math.round(this.direction.y*10)/100}}`;
    }
}