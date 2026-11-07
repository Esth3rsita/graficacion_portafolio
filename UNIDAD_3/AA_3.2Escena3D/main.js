import * as THREE from 'three';

// Se crea la escena
const scene = new THREE.Scene();

// Configurar la cámara
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 4;

// Configurar Renderizador
const canvasElement = document.querySelector('#mi-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Ajustar la pantalla
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Hacer la dona
// Parámetros: (Radio principal, Radio del tubo, Segmentos radiales, Segmentos tubulares)
const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);

// crear y poner colorcito
const material = new THREE.MeshBasicMaterial({ 
  color: 0xDE05FF, 
  wireframe: true 
});

// Crear la malla y agregar a la escena
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Animación
function animate() {
  requestAnimationFrame(animate);

  // Rotación continua en 3 ejes
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.015;
  torus.rotation.z += 0.005;

  // Renderizar escena
  renderer.render(scene, camera);
}

// Iniciar ciclo
animate();
