import BigScreen from 'bigscreen';
// import PL from './node_modules/pointerlock.js/pointerlock';

var scene, camera, light;

scene = THREE.Scene();

camera = new PerspectiveCamera(75, innerWidth/innerHeight, 1, 10000);
camera.position.y = 400;
camera.position.z = 400;

light = new THREE.DirectionalLight(0x000000, 1);
light.position.set(300, 300, 400);

var map = "XXXXXXX    \n" +
          "X     X    \n" +
          "X  S  X    \n" +
          "X     X    \n" +
          "X   S XXX  \n" +
          "XXX     X  \n" +
          " XX S   X  \n" +
          "  X     X  \n" +
          "  XXXXXXX  \n"

map = map.split("\n");
var HORIZONTAL_UNIT = 100,
    VERTICAL_UNIT = 100,
    ZSIZE = map.length * HORIZONTAL_UNIT,
    XSIZE = map[0].length * HORIZONTAL_UNIT;


//generate map
for(var i=0, rows=map.length; i<rows; i++){
  for(var j=0, cols=map[i].length; j<cols; j++){
    addVoxel(map[i].charAt(j), i, j);
  }
}

function addVoxel(type, row, col){
  var z = (row+1) * HORIZONTAL_UNIT - ZSIZE * 0.5;
  x = (col+1) * HORIZONTAL_UNIT - XSIZE * 0.5;
  switch(type){
    case '':
      break;
    case 'S':
      spawnPoints.push(new THREE.Vector3(x, 0, z));
      break;
    case 'X':
      var geo = new THREE.CubeGeometry(HORIZONTAL_UNIT, VERTICAL_UNIT, HORIZONTAL_UNIT);
      var material = new THREE.MeshPhongMaterial({
        color: Math.random() * 0xffffff
      });
      var mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, VERTICAL_UNIT * 0.5, z);
      screen.add(mesh);
      break;
  }
}

document.getElementById('start').addEventListener('click', function(){
if(BigScreen.enabled){
  var instructions = this;
  BigScreen.request(document.body, function(){
    PL.requestPointerLock(document.body, function(){
      instructions.className = 'hidden';
      startAnimating();
    }, function() {
      stopAnimating();
    });
  }, function() {
    instructions.className = 'exited';
    stopAnimating();
  });
}
});

document.addEventListener('mousemove', function(event){
  Player.rotate(event.movementY, event.movementX, 0);
}, false);

player = new Player();
player.add(camera);
scene.add(player);

// When the mesh is instiantiated
mesh.velocity = new THREE.Vector3(0, 0, 0);
mesh.acceleration = new THREE.Vector3(0, 0, 0);

// Called in the animation loop
function update(delta){
  //Apply acceleration
  mesh.velocity.add(mesh.acceleration().clone()).multiplyScalar(delta);
  //Apply velocity
  mesh.position.add(mesh.velocity.clone().multiplyScalar(delta));
}

var halfAccel = mesh.acceleration.clone().multiplyScalar(delta * 0.5);
//Apply half acceleration (first half of midpoint formula)
mesh.velocity.add(halfAccel);
//Apply thrust
mesh.position.add(mesh.velocity.clone().multiplyScalar(delta));
//Apply half acceleration (second half of midpoint formula)
mesh.velocity.add(halfAccel);

document.addEventListener('keydown', function(event) {
  switch(event.key){
    case 38: //up
    case 87: // w
      player.moveDirection.FORWARD = true;
    break;
    case 37: // left
    case 65: //a
      player.moveDirection.LEFT = true;
    break;
    case 40: // down
    case 83: // s
      player.moveDirection.BACKWARD = true;
    break;
    case 39: //right
    case 68: //d
      player.moveDirection.RIGHT = true;
      break;
    case 32: //space
      player.jump();
      break;
  }
}, false);

Player.prototype.update = (function () {
  var halfAccel = new THREE.Vector3();
  var scaledVelocity = new THREE.Vector3();
  return function(delta){
    var r = this._aggregateRotation.multiplyScalar(delta).add(this.rotation);
    r.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, r.x));
    this.rotation.x = 0;

    if(this.moveDirection.FORWARD) {
      this.velocity.z -= Player.SPEED;
    }    
    if(this.moveDirection.LEFT) {
      this.velocity.x -= Player.SPEED;
    }
    if(this.moveDirection.BACKWARD) {
      this.velocity.z += Player.SPEED;
    }
    if(this.moveDirection.RIGHT) {
      this.velocity.z -= Player.SPEED;
    }

    halfAccel.copy(this.acceleration).multiplyScalar(delta * 0.5);
    this.velocity.add(halfAccel);
    var squaredVelocity = this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z;
    if(squaredVelocity > Player.SPEED*Player.SPEED){
      var scalar = Player.SPEED / Math.sqrt(squaredVelocity);
      this.velocity.x *= scalar;
      this.velocity.z *= scalar;
    }
    scaledVelocity.copy(this.velocity).multiplyScalar(delta);
    this.translateX(scaledVelocity.x);
    this.translateZ(scaledVelocity.z);
    this.position.y += scaledVelocity.y;
    this.velocity.add(halfAccel);

    this.velocity.add(scaledVelocity.multiply(this.ambientFriction));
    this.rotation.set(r.x, r.y, r.z);
    this._aggregateRotation.set(0, 0, 0);
  }
}) ();

//player collision check
function checkPlayerCollision(player){
  player.collideFloor(floor.position.y);
  var cell = mapCellFromPosition(player.position);
  switch(cell.char){
    case ' ':
    case 'S':
      break;
    case 'X':
      moveOutside(cell, player);
      break;
  }
}

var XOFFSET = (map.length + 1)* 0.5 * HORIZONTAL_UNIT,
    ZOFFSET = (map[0].length + 1 ) * 0.5 * HORIZONTAL_UNIT,
    col = Math.floor((position.x + XOFFSET) / HORIZONTAL_UNIT) - 1,
    row = Math.floor((position.z + ZOFFSET) / HORIZONTAL_UNIT) - 1,
    char = map[mapRow].charAt(mapCol);

//bots
bot.rotation.y = Math.random() * Math.PI * 2;
bot.moveDirection.FORWARD = Math.random() < 0.8;


function update(delta){
  player.update(delta);
  checkPlayerCollision(player);

  for(var i= bullets.length-1; i>=0; i--){
    bullets[i].update(delta);
    checkBulletCollision(bullets[i], i);  
  }

  for(var j=0; j<enemies.length; j++){
    var enemy = enemies[j];
    enemy.update(delta);
    checkPlayerCollision(enemy);
    if(enemy.health <=0){
      spawn(enemy);
    }
    shoot(enemy, player);
    move(enemy);
    }
    if(player.health <= 0){
      spawn(player);
    }   
}
