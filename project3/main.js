import './style.css'
import * as THREE from 'three';

var scene, camera, light, renderer;
var geometry, material, mesh;

function init(){

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  camera.position.z = 10;

  light =  new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  geometry = new THREE.IcosahedronGeometry(2, 1);
  material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);


}
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x = Date.now()* 0.00005;
  mesh.rotation.y = Date.now()* 0.0001;

  renderer.render(scene, camera);
}


init();
animate();