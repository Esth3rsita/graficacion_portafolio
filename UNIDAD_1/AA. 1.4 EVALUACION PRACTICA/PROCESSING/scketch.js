void setup() {
  // Configuración inicial del lienzo
  size(400, 350);
  noLoop(); // Se dibuja solo una vez al ser una imagen estática
}

void draw() {
  // Fondo claro
  background(240);

  // DIBUJO DEL COCHE
  stroke(20, 20, 150);     // Contorno azul oscuro
  strokeWeight(4);         // Grosor de línea
  fill(30, 60, 200);        // Relleno azul para el coche

  // 1. Parte superior (Cabina)
  // rect(x, y, ancho, alto, r_sup_izq, r_sup_der, r_inf_der, r_inf_izq)
  rect(150, 150, 100, 50, 40, 40, 0, 0);

  // 2. Parte inferior (Carrocería principal)
  rect(100, 200, 200, 60, 30, 30, 0, 0);

  // 3. Ventanas
  fill(220, 230, 240);     // Color azul claro para el cristal
  rect(155, 155, 40, 45, 15, 0, 0, 0); // Ventana izquierda
  rect(205, 155, 40, 45, 0, 15, 0, 0); // Ventana derecha

  // CONFIGURACIÓN DE ESTILO PARA LAS RUEDAS
  stroke(40);              // Contorno gris oscuro
  strokeWeight(6);         // Grosor que simula la goma de la llanta
  fill(80);                // Relleno gris para el neumático

  // 4. Neumáticos (Ruedas externas)
  circle(140, 260, 45);    // Rueda izquierda (x, y, diámetro)
  circle(260, 260, 45);    // Rueda derecha

  // 5. Rines (Centro de las ruedas)
  noStroke();              // Quitamos el contorno para los centros
  fill(220);               // Color gris claro
  circle(140, 260, 20);    // Rin izquierdo
  circle(260, 260, 20);    // Rin derecho
}


