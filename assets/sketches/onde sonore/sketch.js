let fSld, aSld, pSld, wType;
let fLbl, aLbl, pLbl;

function setup() {
    let canvas = createCanvas(windowWidth - 20, 360);
    canvas.parent('canvas-box');
    fSld = select('#f-sld'); aSld = select('#a-sld'); pSld = select('#p-sld'); wType = select('#w-type');
    fLbl = select('#f-lbl'); aLbl = select('#a-lbl'); pLbl = select('#p-lbl');
}

function draw() {
    background(255);
    fLbl.html(Number(fSld.value()).toFixed(1));
    aLbl.html(aSld.value());
    pLbl.html(pSld.value());
    
    stroke(240);
    for(let i=0; i<width; i+=20) line(i, 0, i, height);
    for(let j=0; j<height; j+=20) line(0, j, width, j);
    
    stroke(0);
    strokeWeight(0.1);
    line(0, height/2, width, height/2);

    stroke(0);
    strokeWeight(0.1);
    line(width/2, 0, width/2, height);
    
    noFill(); stroke(0); strokeWeight(1.5);
    
    let f = fSld.value();
    let a = aSld.value();
    let ph = radians(pSld.value());
    let t = wType.value();
    
    beginShape();
    for(let x=0; x<width; x++) {
        let y = height/2;
        let rad = map(x, 0, width, 0, TWO_PI * f) + ph;
        if(t === 'sin') y += sin(rad) * a;
        else if(t === 'comp') y += sin(rad) * a + sin(rad * 3) * (a / 3);
        else if(t === 'aper') y += noise((x + pSld.value()) * 0.04, frameCount * 0.05) * (a * 2) - a;
        vertex(x, y);
    }
    endShape();
}