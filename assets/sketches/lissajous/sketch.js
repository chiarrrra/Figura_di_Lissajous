let fxS, fyS, pS;
let fxL, fyL, pL;
let time = 0;

function setup() {
    let canvas = createCanvas(windowWidth - 20, 360);
    canvas.parent('canvas-box');
    fxS = select('#fx-s'); fyS = select('#fy-s'); pS = select('#p-s');
    fxL = select('#fx-l'); fyL = select('#fy-l'); pL = select('#p-l');
}

function draw() {
    background(255);
    fxL.html(fxS.value()); fyL.html(fyS.value()); pL.html(pS.value());
    
    // Griglia speculare al tool Onde Sonore
    strokeWeight(1);
    stroke(240);
    for(let i=0; i<width; i+=20) line(i, 0, i, height);
    for(let j=0; j<height; j+=20) line(0, j, width, j);
    
    // Assi cartesiani speculari al tool Onde Sonore
    stroke(0);
    strokeWeight(0.1);
    line(0, height/2, width, height/2);

    stroke(0);
    strokeWeight(0.1);
    line(width/2, 0, width/2, height);
    
    let fx = fxS.value();
    let fy = fyS.value();
    let ph = radians(pS.value());
    let amp = 120; // Ampiezza fissa come da richiesta precedente
    
    push();
    translate(width/2, height/2);
    
    // Disegna la curva tracciata (stile speculare)
    noFill(); 
    stroke(0); 
    strokeWeight(1.5);
    beginShape();
    for(let i=0; i<=TWO_PI; i+=0.01) {
        let x = amp * sin(fx * i + ph);
        let y = amp * sin(fy * i);
        vertex(x, y);
    }
    endShape();
    
    // Disegna la pallina animata sulla curva
    time += 0.03; 
    let bx = amp * sin(fx * time + ph);
    let by = amp * sin(fy * time);
    
    fill(0); 
    noStroke();
    ellipse(bx, by, 10, 10);
    
    pop();
}