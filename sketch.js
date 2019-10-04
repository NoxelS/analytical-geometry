var GeradenArray = [];
var Achsen = [];
var onHold = false;
var holdPoint;
var holdGerade;

function setup() {
  createCanvas(windowWidth/2, windowHeight);
  
  Achsen.push(new Achse('x'));
  Achsen.push(new Achse('y'));
  GeradenArray.push(new Gerade(createVector(0, 0), createVector(0, 0)));
}

function windowResized() {
  resizeCanvas(windowWidth/2, windowHeight);
}

function draw() {
  if(onHold)
    holdGerade.b = createVector(mouseX-windowWidth/4,mouseY-windowHeight/2);

  translate(windowWidth/4, windowHeight/2);
  clear();
  background('#04151F');
  Achsen.forEach(el => el.render());
  GeradenArray.forEach(el => el.render());

  // Schnittpunkte der Holdgeraden
  if(onHold){
    holdGerade.render();
    for(let i = 0; i < GeradenArray.length; i++){
      let schnittpunkt = holdGerade.schnittpunkt(GeradenArray[i]);
      stroke('#0094C6');
      fill('#0094C6');
      if(schnittpunkt)
      circle(schnittpunkt.x, schnittpunkt.y,10);
    }
  }

  //Schnittpunkte aller geraden
  for(let i = 0; i < GeradenArray.length; i++){
    for(let k = i+1; k < GeradenArray.length; k++){
      let schnittpunkt = GeradenArray[i].schnittpunkt(GeradenArray[k]);
      if(schnittpunkt){
        stroke('#0094C6');
        fill('#0094C6');
        circle(schnittpunkt.x, schnittpunkt.y,5);
        textSize(15);
        textAlign(CENTER, CENTER);
        fill('#0094C6')
        strokeWeight(0); 
       
        text(`(${Math.round(schnittpunkt.x*10)/100} | ${Math.round(-schnittpunkt.y*10)/100})`, schnittpunkt.x, schnittpunkt.y-25);

        strokeWeight(3); 
      
      
      
      }
    }
  }

}

function write(){
  const gleichungen = document.getElementById("gleichungen");
  while (gleichungen.firstChild) {
    gleichungen.removeChild(gleichungen.firstChild);
  }
  const ergebnisse = document.getElementById("ergebnisse");
  while (ergebnisse.firstChild) {
    ergebnisse.removeChild(ergebnisse.firstChild);
  }

  const ergebnisse_s = document.getElementById("ergebnisse_s");
  while (ergebnisse_s.firstChild) {
    ergebnisse_s.removeChild(ergebnisse_s.firstChild);
  }

  // Geradengleichungen
  for(var i = 1; i < GeradenArray.length; i++){
    var p = document.createElement("p");
    let string = "$${{";
    string+=GeradenArray[i].genText();
    p.innerHTML = string + '}}$$';
    document.getElementById('gleichungen').appendChild(p);
  }

  // Schnittpunkte
  for(let i = 0; i < GeradenArray.length; i++){
    for(let k = i+1; k < GeradenArray.length; k++){
      let schnittpunkt = GeradenArray[i].schnittpunkt(GeradenArray[k]);
      if(schnittpunkt){
        var p = document.createElement("p");
        p.innerHTML = "$${{S(g_"+GeradenArray[i].index+",g_"+GeradenArray[k].index+") = \\left ( "+Math.round(schnittpunkt.x*10)/100+" | "+Math.round(-schnittpunkt.y*10)/100+" \\right )}}$$";
        document.getElementById('ergebnisse').appendChild(p);   
      }
    }
  }

  // Sprupunkte
  for(var i = 1; i < GeradenArray.length; i++){
    var p = document.createElement("p");
    let string = "$${{";
    string+= `g_${GeradenArray[i].index}: S_{x-Achse} = \\left ( 0 | ${Math.round(-GeradenArray[i].s_0.y*10)/100} \\right ),  S_{y-Achse} = \\left ( ${Math.round(GeradenArray[i].s_1.x*10)/100} | 0 \\right )`;
    p.innerHTML = string + '}}$$';
    document.getElementById('ergebnisse_s').appendChild(p);
  }

  MathJax.typeset();
}


// New Grade
function mouseClicked() {
  if(mouseX > 0){
    if(!onHold){
      holdPoint = createVector(mouseX-windowWidth/4,mouseY-windowHeight/2)
      onHold = !onHold;
      holdGerade = new Gerade(holdPoint, createVector(mouseX-windowWidth/4,mouseY-windowHeight/2));
    }else{
      GeradenArray.push(new Gerade(holdPoint,createVector(mouseX-windowWidth/4,mouseY-windowHeight/2)));
      onHold = !onHold;
      write();
    }
  }
}