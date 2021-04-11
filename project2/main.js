import './style.css'
import * as THREE from 'three';

var scene, camera, light, renderer;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 10;

light =  new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 0, 1);
scene.add(light);

renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(10,10, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x0000FF,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

// add jaggy depth effect
const {array} = planeMesh.geometry.attributes.position;
for(let i =0; i<array.length; i=i+3){
  const first = array[i];
  const second = array [i+1];
  const third = array[i+2];
  array[i+ 2] = third + Math.random();
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate();