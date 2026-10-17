let velasEncendidas = true; 
let anguloFlores = 0; 
let estrellas = [];
let petalos = [];
let humo = []; 
let fuegos = []; 
let musica; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  
  //musica
  soundFormats('mp3'); 
  loadSound('cancion.mp3', function(sonidoCargado) {
  musica = sonidoCargado;
  });

  for (let i = 0; i < 300; i++) {
    estrellas.push({
      x: random(width), y: random(height),
      tam: random(1, 3.5), brillo: random(100, 255), vel: random(1, 3)
    });
  }
}

function draw() {
  background(35, 20, 60); 

  dibujarFondoEstrellado();
  actualizarYDibujarFuegos(); 
  dibujarBanderinesVerticales(); 
  
  push();
  translate(width / 2, height / 2 + 120); 
  scale(0.80); 
  
  dibujarNubesFloralesBasales(); 
  dibujarArcoYCruz(); 
  dibujarNivelesAltar(); 
  dibujarGuirnaldasPapel(); 
  
  dibujarCopalerosYHumo(); 
  dibujarFloresEngrane();  
  dibujarMarcosYOfrendas(); 
  dibujarCalaverasGrandes();
  dibujarVelasLargas();     
  
  pop();
  
  actualizarYDibujarPetalos();
  dibujarTextoInferior(); 
  
  anguloFlores += 1.5; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  estrellas = [];
  for (let i = 0; i < 300; i++) {
    estrellas.push({
      x: random(width), y: random(height),
      tam: random(1, 3.5), brillo: random(100, 255), vel: random(1, 3)
    });
  }
}

function mousePressed() { 
  generarExplosionPetalos(mouseX, mouseY);
  crearFuegoArtificial(mouseX, height); 
  
  if (musica) {
    if (musica.isPlaying()) musica.pause();
    else musica.loop(); 
  }
}

function mouseMoved() {
  if (frameCount % 2 === 0) {
    petalos.push({
      x: mouseX, y: mouseY, vx: random(-1.5, 1.5), vy: random(1, 4),
      angulo: random(360), va: random(-10, 10), vida: 255
    });
  }
}

function dibujarTextoInferior() {
  push(); textAlign(CENTER, BOTTOM);
  fill(0, 150); textSize(40); textStyle(BOLD); text("LEONCILLOS", width / 2 + 3, height - 42);
  fill(0, 255, 255); text("LEONCILLOS", width / 2, height - 45);
  fill(0, 150); textSize(22); textStyle(NORMAL); text("(Ingeniería en Sistemas Computacionale)", width / 2 + 2, height - 13);
  fill(255, 200, 250); text("(Ingeniería en Sistemas Computacionales)", width / 2, height - 15);
  pop();
}

function crearFuegoArtificial(xFuego, yFuego) {
  fuegos.push({
    x: xFuego, y: yFuego, vy: random(-12, -18), 
    color: color(random(100, 255), random(100, 255), random(100, 255)),
    estado: 'subiendo', particulas: []
  });
}

function actualizarYDibujarFuegos() {
  if (random(1) < 0.02) crearFuegoArtificial(random(width * 0.1, width * 0.9), height);
  for (let i = fuegos.length - 1; i >= 0; i--) {
    let f = fuegos[i];
    if (f.estado === 'subiendo') {
      f.y += f.vy; f.vy += 0.2; 
      noStroke(); fill(f.color); ellipse(f.x, f.y, 4, 12);
      fill(255, 100); ellipse(f.x, f.y + 10, 3, 3);
      if (f.vy >= 0) { 
        f.estado = 'explotando';
        for (let j = 0; j < 35; j++) { 
          let ang = random(360), vel = random(2, 6);
          f.particulas.push({ px: f.x, py: f.y, vx: cos(ang) * vel, vy: sin(ang) * vel, vida: 255 });
        }
      }
    } else {
      let vivas = false;
      for (let p of f.particulas) {
        if (p.vida > 0) {
          vivas = true; p.px += p.vx; p.py += p.vy; p.vy += 0.05; p.vida -= 4;
          noStroke(); fill(red(f.color), green(f.color), blue(f.color), p.vida); ellipse(p.px, p.py, 4, 4);
        }
      }
      if (!vivas) fuegos.splice(i, 1); 
    }
  }
}

function generarExplosionPetalos(x, y) {
  for (let i = 0; i < 20; i++) {
    petalos.push({ x: x, y: y, vx: random(-5, 5), vy: random(-3, 6), angulo: random(360), va: random(-15, 15), vida: 255 });
  }
}

function actualizarYDibujarPetalos() {
  noStroke();
  for (let i = petalos.length - 1; i >= 0; i--) {
    let p = petalos[i];
    push(); translate(p.x, p.y); rotate(p.angulo); fill(255, random(120, 170), 0, p.vida); ellipse(0, 0, 14, 7); pop();
    p.x += p.vx + sin(frameCount * 2 + p.vida) * 1.5; p.y += p.vy; p.vy += 0.05; p.angulo += p.va; p.vida -= 2.5; 
    if (p.vida <= 0) petalos.splice(i, 1);
  }
}

function dibujarCopalerosYHumo() {
  let posCopaleros = [-320, 320]; 
  for (let x of posCopaleros) {
    push(); translate(x, 40); noStroke();
    fill(139, 69, 19); arc(0, 0, 45, 45, 0, 180); fill(255, 100, 0, 150); ellipse(0, 0, 40, 12); pop();
  }
  if (velasEncendidas && frameCount % 3 === 0) {
    for (let x of posCopaleros) humo.push({ x: x + random(-10, 10), y: 30, vx: random(-0.8, 0.8), vy: random(-2, -4), tam: random(15, 30), vida: 200 });
  }
  noStroke();
  for (let i = humo.length - 1; i >= 0; i--) {
    let h = humo[i];
    fill(200, 200, 220, h.vida * 0.4); ellipse(h.x, h.y, h.tam);
    h.x += h.vx + sin(frameCount * 4 + h.y) * 0.8; h.y += h.vy; h.tam += 0.3; h.vida -= 1.5;
    if (h.vida <= 0) humo.splice(i, 1);
  }
}

function dibujarFondoEstrellado() {
  noStroke();
  for (let e of estrellas) {
    let parpadeo = e.brillo + sin(frameCount * e.vel + e.x) * 80;
    fill(255, 255, 220, parpadeo); ellipse(e.x, e.y, e.tam);
  }
}

function dibujarBanderinesVerticales() {
  let posicionesX = [width * 0.15, width * 0.85];
  let colores = [color(100, 200, 200), color(255, 100, 150)];
  for (let i = 0; i < posicionesX.length; i++) {
    push(); translate(posicionesX[i], 0);
    stroke(255, 150); strokeWeight(2); line(-60, 0, 0, 50); line(60, 0, 0, 50);
    noStroke(); fill(colores[i]); rect(0, 200, 120, 300, 10, 10, 30, 30);
    fill(35, 20, 60); ellipse(0, 100, 40, 40);
    for(let a = 0; a < 360; a+=60) ellipse(cos(a)*30, 100 + sin(a)*30, 15, 15);
    rect(0, 220, 60, 20, 10); rect(0, 260, 40, 15, 10);
    ellipse(-40, 350, 30, 30); ellipse(0, 350, 30, 30); ellipse(40, 350, 30, 30);
    pop();
  }
}

function dibujarNubesFloralesBasales() {
  noStroke();
  push(); translate(-450, 50); fill(255, 200, 0); ellipse(0, 0, 200, 150); ellipse(-80, 40, 180, 120); fill(255, 150, 0); ellipse(20, 20, 160, 100); pop();
  push(); translate(450, 50); fill(255, 200, 0); ellipse(0, 0, 200, 150); ellipse(80, 40, 180, 120); fill(255, 150, 0); ellipse(-20, 20, 160, 100); pop();
}

function dibujarNivelesAltar() {
  strokeWeight(2); stroke(80, 30, 150);
  fill(color(100, 40, 180)); rect(0, 0, 750, 140, 20, 20, 5, 5); dibujarCosturasBlancas(750, -40);
  fill(color(120, 50, 200)); rect(0, -110, 550, 120, 20, 20, 5, 5); dibujarCosturasBlancas(550, -140);
  fill(color(140, 60, 220)); rect(0, -220, 350, 120, 20, 20, 5, 5); dibujarCosturasBlancas(350, -250);
}

function dibujarCosturasBlancas(ancho, yOffset) {
  push(); noFill(); stroke(255, 200); strokeWeight(2.5); drawingContext.setLineDash([4, 6]); 
  bezier(-ancho/2, yOffset, -ancho/4, yOffset+40, ancho/4, yOffset+40, ancho/2, yOffset);
  bezier(-ancho/2, yOffset+15, -ancho/4, yOffset+60, ancho/4, yOffset+60, ancho/2, yOffset+15);
  drawingContext.setLineDash([]); pop();
}

function dibujarGuirnaldasPapel() {
  let yNiveles = [-40, -150], anchos = [700, 500], colores = [color(255,150,0), color(0,200,255), color(255,0,150), color(200,50,255)];
  noStroke();
  for (let n = 0; n < yNiveles.length; n++) {
    let ancho = anchos[n], y = yNiveles[n], cantidad = ancho / 45;
    stroke(255, 100); strokeWeight(1); line(-ancho/2, y - 10, ancho/2, y - 10);
    noStroke();
    for (let i = 0; i <= cantidad; i++) {
      let x = -ancho/2 + (i * 45);
      push(); translate(x, y); rotate(sin(frameCount * 3 + x) * 10); 
      fill(colores[i % colores.length]); rect(0, 0, 35, 25, 2); fill(50, 20, 100); ellipse(0, 0, 10, 10); pop();
    }
  }
}

function dibujarArcoYCruz() {
  push(); translate(0, -230);
  fill(255, 253, 230); noStroke(); rect(0, -210, 15, 60, 3); rect(0, -220, 45, 15, 3); fill(255, 50, 100); ellipse(0, -220, 8, 8); 
  noFill(); stroke(255, 150, 0); strokeWeight(50); arc(0, 20, 420, 480, 180, 360);
  noStroke();
  for(let a = 180; a <= 360; a += 8) {
    let rx = cos(a) * 210, ry = sin(a) * 240 + 20;
    fill(255, 180, 0); ellipse(rx, ry, 45, 45); fill(255, 120, 0); ellipse(rx, ry, 25, 25);
  }
  pop();
}

function dibujarFloresEngrane() {
  push(); translate(-180, 20); rotate(anguloFlores); dibujarCempasuchilDigital(); pop();
  push(); translate(180, 20); rotate(-anguloFlores); dibujarCempasuchilDigital(); pop();
}

function dibujarCempasuchilDigital() {
  noStroke(); fill(255, 120, 0); 
  for (let i = 0; i < 360; i += 30) { push(); rotate(i); ellipse(0, -28, 20, 25); pop(); }
  fill(255, 200, 0); ellipse(0, 0, 45, 45); fill(30); ellipse(0, 0, 20, 20); 
}

function dibujarCalaverasGrandes() {
  let posX = [-430, 430];
  for (let x of posX) {
    push(); translate(x, 10); noStroke();
    fill(245, 240, 230); ellipse(0, -20, 140, 120); rect(0, 30, 80, 60, 15);
    fill(100, 0, 200); ellipse(-30, -10, 50, 50); ellipse(30, -10, 50, 50);
    fill(0, 255, 255); ellipse(-30, -10, 20, 20); ellipse(30, -10, 20, 20);
    fill(30, 15, 60); triangle(0, 30, -10, 50, 10, 50);
    stroke(100); strokeWeight(2); line(-30, 55, 30, 55); for(let i = -20; i <= 20; i+=10) line(i, 45, i, 65);
    noStroke(); fill(255, 0, 100); ellipse(0, -55, 15, 15); ellipse(-20, -50, 10, 10); ellipse(20, -50, 10, 10);
    pop();
  }
}

function dibujarMarcosYOfrendas() {
  push(); translate(0, -280); stroke(220, 190, 120); strokeWeight(10); fill(255); rect(0, 0, 150, 180, 5); dibujarLogoITS(); pop();
  dibujarPanDeMuerto(-140, -115); dibujarPanDeMuerto(140, -115);  
  push(); translate(0, -125); scale(0.65); dibujarLeoncilloAnimado(); pop();
  push(); translate(-245, -115); rotate(anguloFlores); scale(0.8); dibujarCempasuchilDigital(); pop();
  push(); translate(245, -115); rotate(-anguloFlores); scale(0.8); dibujarCempasuchilDigital(); pop();
  dibujarPanDeMuerto(-100, 20); dibujarPanDeMuerto(100, 20);  
}

function dibujarPanDeMuerto(x, y) {
  push(); translate(x, y); noStroke();
  fill(210, 130, 60); ellipse(0, 0, 90, 60); fill(235, 170, 100); rect(0, 0, 75, 18, 10); 
  push(); rotate(90); rect(0, 0, 50, 18, 10); pop();
  ellipse(0, -25, 30, 30); fill(255, 200); for (let i = 0; i < 15; i++) ellipse(random(-30, 30), random(-20, 20), 3.5, 3.5); pop();
}

function dibujarVelasLargas() {
  let posVelas = [ {x: -110, y: -250}, {x: 110, y: -250}, {x: -185, y: -120}, {x: 185, y: -120}, {x: -215, y: -120}, {x: 215, y: -120}, {x: -260, y: 10}, {x: 260, y: 10} ];
  for (let v of posVelas) {
    push(); translate(v.x, v.y);
    noStroke(); fill(245, 240, 220); rect(0, 0, 18, 70, 3);
    fill(230, 225, 200); ellipse(-5, 25, 6, 20); ellipse(6, 15, 5, 25);
    stroke(50); strokeWeight(2); line(0, -35, 0, -42);
    if (velasEncendidas) {
      noStroke();
      let realX = width/2 + (v.x * 0.8), realY = (height/2 + 120) + (v.y * 0.8);
      let distanciaMouse = dist(mouseX, mouseY, realX, realY), escalaLlama = 1.0 + sin(frameCount * 6 + v.x) * 0.1;
      if (distanciaMouse < 80) escalaLlama *= 1.8; 
      translate(0, -45); scale(escalaLlama);
      fill(0, 200, 255, 60); ellipse(0, 0, 35, 50); fill(0, 100, 255, 220); ellipse(0, 0, 16, 28); fill(200, 240, 255); ellipse(0, 0, 8, 15);         
    }
    pop();
  }
}

function dibujarLogoITS() {
  push(); scale(0.55); fill(0); noStroke();
  textSize(16); textStyle(BOLD); textAlign(CENTER, BASELINE);
  let texto = "INSTITUTO TECNOLÓGICO SUPERIOR", radioTexto = 88;
  for (let i = 0; i < texto.length; i++) {
    push(); let ang = map(i, 0, texto.length - 1, -120, 120); rotate(ang); translate(0, -radioTexto); text(texto[i], 0, 0); pop();
  }
  fill(142, 198, 63); ellipse(-75, 45, 10, 10); ellipse(75, 45, 10, 10);
  let colorAzul = color(30, 40, 95); dibujarEngranePoligonal(0, 0, 75, 60, 8, colorAzul);
  let colorVerde = color(142, 198, 63); dibujarEngranePoligonal(0, 0, 57, 45, 8, colorVerde);
  stroke(220, 190, 120); strokeWeight(3); noFill(); drawingContext.setLineDash([4, 4]); ellipse(0, 0, 82, 82); drawingContext.setLineDash([]); 
  noStroke(); fill(colorAzul); ellipse(0, 0, 50, 50); fill(255); ellipse(0, 0, 22, 22);
  pop();
}

function dibujarEngranePoligonal(x, y, radExt, radInt, dientes, colorFill) {
  push(); translate(x, y); fill(colorFill); noStroke(); beginShape();
  let paso = 360 / dientes;
  for (let i = 0; i < 360; i += paso) {
    let m = paso / 4;
    vertex(cos(i - m) * radExt, sin(i - m) * radExt); vertex(cos(i + m) * radExt, sin(i + m) * radExt);
    vertex(cos(i + m + 5) * radInt, sin(i + m + 5) * radInt); vertex(cos(i + paso - m - 5) * radInt, sin(i + paso - m - 5) * radInt);
  }
  endShape(CLOSE); pop();
}

function dibujarLeoncilloAnimado() {
  push(); noStroke();
  fill(255, 160, 0); ellipse(0, 10, 70, 70); 
  push(); translate(0, -30); rotate(sin(frameCount * 2) * 5); 
  fill(200, 50, 0); ellipse(0, 0, 100, 100); fill(255); ellipse(0, 0, 65, 55); 
  fill(0); ellipse(-12, -5, 15, 15); ellipse(12, -5, 15, 15); fill(0, 255, 255); ellipse(-12, -5, 5, 5); ellipse(12, -5, 5, 5); 
  push(); translate(0, 15);
  let aperturaBoca = map(sin(frameCount * 5), -1, 1, 0, 10); translate(0, aperturaBoca); 
  fill(255); arc(0, 0, 40, 30, 0, 180); 
  stroke(0); strokeWeight(2.5); line(-10, 0, -10, 10); line(0, 0, 0, 12); line(10, 0, 10, 10);
  pop(); pop(); pop(); 
}
