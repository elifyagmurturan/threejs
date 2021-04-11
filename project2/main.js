import './style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';

var scene, camera, light, renderer, gui, mouse, raycaster;

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
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true})
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
const colors = [];
for(let i=0; i<planeMesh.geometry.attributes.position.count; i++){
  colors.push(1,1,0);
}
planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3)
)
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
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planeMesh);
  //hovering effect
  if(intersects.length>0){
    const {color} = intersects[0].object.geometry.attributes;
    //vertice 0
    color.setX(intersects[0].face.a, 0);
    // vertice 1
    color.setX(intersects[0].face.b, 0);
    // vertice 2
    color.setX(intersects[0].face.c, 0);
    color.needsUpdate = true;
  }
}

gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
    height: 10,
    widthSegments: 5,
    heightSegments: 5
  }
}

gui.add(world.plane, 'width', 1, 20).onChange(generatePlane);
gui.add(world.plane, 'height', 1, 15).onChange(generatePlane);
gui.add(world.plane, 'widthSegments', 1, 15).onChange(generatePlane);
gui.add(world.plane, 'heightSegments', 1, 15).onChange(generatePlane);

function generatePlane(){
  planeMesh.geometry.dispose();
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width, 
    world.plane.height, 
    world.plane.widthSegments, 
    world.plane.heightSegments);
  
  // add jaggy depth effect
  const {array} = planeMesh.geometry.attributes.position;
  for(let i =0; i<array.length; i=i+3){
    const first = array[i];
    const second = array [i+1];
    const third = array[i+2];
    array[i+ 2] = third + Math.random();
  }
}

mouse = {
  x: undefined,
  y: undefined
}
addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX/ innerWidth)*2 -1;
  mouse.y = -(event.clientY/ innerHeight)*2 +1;
})

raycaster = new THREE.Raycaster();

animate();