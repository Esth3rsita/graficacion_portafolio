function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 192, 203); 

  // Antenitas
  strokeWeight(10); 
  line(150, 100, 150, 50); 
  line(250, 100, 250, 50); 

  // Cara y Boca 
  strokeWeight(2); 
  
  stroke(0, 0, 0);
  fill(128, 128, 128);      
  rect(100, 100, 200, 200); 
  
  fill(255, 0, 0);          
  rect(150, 240, 100, 30);  

  // Ojos 
  fill(255, 255, 255);       
  ellipse(150, 160, 40, 40); 
  ellipse(250, 160, 40, 40); 

  // Nariz 
  fill(255, 165, 0);        
  triangle(200, 180, 170, 220, 230, 220); 
}
