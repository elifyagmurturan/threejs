import './style.css'
import * as THREE from 'three';

var scene, camera, renderer;
var IcosahedronGeometry, IcosahedronMaterial, IcosahedronMesh;
var triangle, triangleGeometry, triangleMaterial, triangleMesh;

function init(){

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
  camera.position.z = 10;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  IcosahedronGeometry = new THREE.IcosahedronGeometry(2, 1);
  IcosahedronMaterial = new THREE.MeshNormalMaterial();
  IcosahedronMesh = new THREE.Mesh(IcosahedronGeometry, IcosahedronMaterial);
  scene.add(IcosahedronMesh);

  triangle = new THREE.Shape([
    new THREE.Vector3(0, 3),
    new THREE.Vector3(3, 3),
    new THREE.Vector3(3, 0)
  ]);
  triangleGeometry = new THREE.ExtrudeGeometry(triangle,
    {bevelEnabled: false,
      depth: 30
  });

  triangleMaterial = new THREE.MeshNormalMaterial();
  triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
  triangleMesh.rotation.x  = -5;
  triangleMesh.rotation.y = -9;
  scene.add(triangleMesh);
  

}
function animate() {
  requestAnimationFrame(animate);

  IcosahedronMesh.rotation.x = Date.now()* 0.0005;
  IcosahedronMesh.rotation.y = Date.now()* 0.001;

  renderer.render(scene, camera);
}


init();
animate();