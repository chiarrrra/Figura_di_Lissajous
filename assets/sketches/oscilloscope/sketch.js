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
    
    // Piano cartesiano XY (stile XY)
    stroke(1); strokeWeight(0.1);
    for(let i=0; i<width; i+=40) line(i, 0, i, height);
    for(let j=0; j<height; j+=40) line(0, j, width, j);
    
    // Assi principali con "tacche" (tick marks)
    stroke(0); strokeWeight(0.1);
    line(width/2, 0, width/2, height); // Asse Y
    line(0, height/2, width, height/2); // Asse X
    for(let i=0; i<width; i+=40) line(i, height/2 - 4, i, height/2 + 4);
    for(let j=0; j<height; j+=40) line(width/2 - 4, j, width/2 + 4, j);
    
    let fx = fxS.value();
    let fy = fyS.value();
    let ph = radians(pS.value());
    let amp = 120; // Ampiezza fissa come richiesto
    
    push();
    translate(width/2, height/2);
    
    // Disegna la curva tracciata
    noFill(); stroke(150); strokeWeight(2);
    beginShape();
    for(let i=0; i<=TWO_PI; i+=0.01) {
        let x = amp * sin(fx * i + ph);
        let y = amp * sin(fy * i);
        vertex(x, y);
    }
    endShape();
    
    // Disegna la pallina animata
    time += 0.03; // Velocità della pallina
    let bx = amp * sin(fx * time + ph);
    let by = amp * sin(fy * time);
    
    fill(255); noStroke();
    ellipse(bx, by, 10, 10);
    
    pop();
}