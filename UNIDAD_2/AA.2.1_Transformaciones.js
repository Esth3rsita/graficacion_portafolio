function setup() {
  createCanvas(600, 200);
  angleMode(DEGREES);
  rectMode(CENTER); 
}

function draw() {
  background(240);

  // Panda Bebé 
  push();
  translate(60, 100);
  scale(0.8);
  rotate(-10);
  drawPanda(color(255, 230, 230), 4, color(180, 120, 120), 'bebe');
  pop();

  //Panda Niño
  push();
  translate(170, 100);
  scale(1.1);
  rotate(-5);
  drawPanda(color(255, 250, 245), 8, color(80, 80, 80), 'paleta');
  pop();

  //Panda Joven
  push();
  translate(290, 100);
  scale(1.4);
  rotate(0);
  drawPanda(color(255, 255, 255), 12, color(30, 30, 30), 'lentes');
  pop();

  //Panda Adulto 
  push();
  translate(420, 100);
  scale(1.7);
  rotate(5);
  drawPanda(color(255, 255, 255), 16, color(0, 0, 0), 'bigote');
  pop();

  //Panda Viejillo 
  push();
  translate(540, 100);
  scale(2.0);
  rotate(12);
  drawPanda(color(200, 200, 200), 20, color(100, 100, 100), 'viejo');
  pop();
}
//centrar 0,0
function drawPanda(colPiel, tamMancha, colMancha, etapa) {
  // Aislamiento de estilos de bordes
  stroke(0);
  strokeWeight(2);

  //Orejas
  fill(colMancha);
  ellipse(-16, -18, tamMancha, tamMancha);
  ellipse(16, -18, tamMancha, tamMancha);

  //Cabeza Principal
  fill(colPiel);
  ellipse(0, 0, 40, 35);

  if (etapa !== 'lentes') {
    fill(colMancha);
    ellipse(-10, -3, tamMancha * 0.8, tamMancha * 0.9);
    ellipse(10, -3, tamMancha * 0.8, tamMancha * 0.9);

    // Ojitos 
    fill(255);
    ellipse(-10, -3, 3, 3);
    ellipse(10, -3, 3, 3);
  }

  // 4. Carita y nariz
  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(0, 5, 14, 10);

  fill(colMancha);
  ellipse(0, 3, 6, 4); // Nariz

  //accesorios

  //Paleta
  if (etapa === 'paleta') {
    stroke(120, 80, 40); // Palito
    strokeWeight(2);
    line(8, 8, 14, 18);
    
    stroke(0);
    strokeWeight(1);
    fill(255, 50, 80); // bolita de la paleta
    ellipse(14, 18, 10, 10);
  }

  //lentes
  if (etapa === 'lentes') {
    fill(0);
    stroke(0);
    strokeWeight(1);
    rect(-10, -3, 14, 10, 2);
    rect(10, -3, 14, 10, 2);
    strokeWeight(2);
    line(-3, -3, 3, -3); 
  }

  //Bigote
  if (etapa === 'bigote') {
    fill(0);
    noStroke();
    ellipse(-4, 8, 8, 4);
    ellipse(4, 8, 8, 4);
  }

  // Cejas para el panda viejillo
  if (etapa === 'viejo') {
    stroke(80);
    strokeWeight(2);
    line(-14, -12, -6, -10);
    line(6, -10, 14, -12);
  }
}
