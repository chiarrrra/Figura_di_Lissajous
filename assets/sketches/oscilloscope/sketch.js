let fxS, fyS, pS;
let fxL, fyL, pL;
let time = 0;

function setup() {
    // Genera un canvas che si adatta perfettamente alla finestra del tool
    let canvas = createCanvas(windowWidth - 20, 360);
    canvas.parent('canvas-box');
    
    // Mappatura selettori dell'interfaccia
    fxS = select('#fx-s'); fyS = select('#fy-s'); pS = select('#p-s');
    fxL = select('#fx-l'); fyL = select('#fy-l'); pL = select('#p-l');
}

function draw() {
    background(255);
    
    // Aggiorna dinamicamente i valori numerici scritti nei label dell'HTML
    fxL.html(fxS.value()); 
    fyL.html(fyS.value()); 
    pL.html(pS.value());
    
    // Disegno della griglia millimetrata dell'oscilloscopio (passo 20px)
    stroke(240);
    strokeWeight(1);
    for(let i = 0; i < width; i += 20) line(i, 0, i, height);
    for(let j = 0; j < height; j += 20) line(0, j, width, j);
    
    // Disegno degli Assi Cartesiani Centrali del Display X-Y
    stroke(0);
    strokeWeight(0.1);
    line(0, height / 2, width, height / 2); // Asse X guidato da CH1
    line(width / 2, 0, width / 2, height); // Asse Y guidato da CH2
    
    // Recupero dati dai potenziometri (cursori slider)
    let freqCH1 = fxS.value();
    let freqCH2 = fyS.value();
    let deltaPhase = radians(pS.value());
    
    // Dimensionamento dell'ampiezza per contenere il tracciato nel monitor
    let ampX = min(width / 2 - 30, 140);
    let ampY = min(height / 2 - 30, 140);
    
    push();
    translate(width / 2, height / 2); // Sposta l'origine al centro dello schermo
    
    // COMPORTAMENTO VETTORIALE: Disegno della figura di Lissajous complessiva
    noFill(); 
    stroke(0); 
    strokeWeight(1.5);
    beginShape();
    // Campionamento continuo ad alta precisione per chiudere la curva perfettamente
    for(let i = 0; i <= TWO_PI; i += 0.01) {
        let x = ampX * sin(freqCH1 * i + deltaPhase);
        let y = ampY * sin(freqCH2 * i);
        vertex(x, y);
    }
    endShape();
    
    // SIMULAZIONE DEL RAGGIO: Il punto luminoso mobile tracciato in tempo reale
    time += 0.03; 
    let pointX = ampX * sin(freqCH1 * time + deltaPhase);
    let pointY = ampY * sin(freqCH2 * time);
    
    fill(0); 
    noStroke();
    ellipse(pointX, pointY, 10, 10); // Spot luminoso dell'oscilloscopio
    
    pop();
}

// Ridimensiona il canvas se la finestra o l'iframe cambiano dimensione
function windowResized() {
    resizeCanvas(windowWidth - 20, 360);
}