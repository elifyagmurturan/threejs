import './style.css'
import * as THREE from 'three';
import { TetrahedronGeometry } from 'three';

var scene, camera, renderer;
var geometry, material, mesh;

scene = new THREE.Scene();

geometry = new THREE.IcosahedronBufferGeometry(200, 1);
material = new THREE.MeshBasicMaterial({
  color: 0x000000, 
  wireframe: true,
  wireframeLinewidth: 2});
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 1, 1000);
camera.position.z = 500;

renderer = new THREE.CanvasRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
