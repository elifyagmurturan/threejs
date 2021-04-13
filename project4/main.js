import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';

var scene, camera, light, renderer;

function setup(){
    document.body.style.backgroundColor = '#d7f0f7';
    setupThreeJS();
    setupWorld();

    requestAnimationFrame(function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    });

    function setupThreeJS() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 1, 100000);
        camera.position.y = 400;
        camera.position.z = 400;
        camera.rotation.x = -45 * Math.PI/ 180;

        light = new THREE.DirectionalLight(0xf6e86d, 1);
        light.position.set(500, 1500, 1000);
        light.castShadow = true;
        light.shadow.camera.far = 2500;
        light.shadow.mapSize.width = 2048;
        scene.add(light);
        //DirectionalLight
        light.shadow.camera.left = -1000;
        light.shadow.camera.right = 1000;
        light.shadow.camera.top = 1000;
        light.shadow.camera.bottom = -1000;
        light.shadow.camera.visible = true;


        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(innerWidth, innerHeight);
        renderer.shadowMapsEnabled = true;
        document.body.appendChild(renderer.domElement);
    }

    function setupWorld(){
        //Floor
        var geo = new THREE.PlaneGeometry(2000, 2000, 20, 20);
        var mat = new THREE.MeshBasicMaterial({color: 0x9db3b5});
        var floor = new THREE.Mesh(geo, mat);
        floor.rotation.x = -90 * Math.PI / 180;
        scene.add(floor);

        //Original building
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
        var material = new THREE.MeshPhongMaterial({color: 0xcccccc});

        //Cloned buildings
        for(var i=0; i<300; i++){
            var building = new THREE.Mesh(geometry.clone(), material.clone());
            building.position.x = Math.floor(Math.random() * 200 - 100) * 4;
            building.position.z = Math.floor(Math.random() * 200 - 100) * 4;
            building.scale.x = Math.random() * 50 + 10;
            building.scale.y = Math.random() * building.scale.x * 8 + 8;
            building.scale.z = building.scale.x;
            building.castShadow = true;
            // building.receiveShadow = true;
            scene.add(building);
        }   

        scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);

        floor.receiveShadow = true;



        
    }

    
}

setup();