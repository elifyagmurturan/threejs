
Bullet.prototype.update(function () {
    var scaledDirection = new THREE.Vector3();
    return function(delta){
      scaledDirection.copy(this.direction).multiplyScalar(this.speed* delta);
      this.position.add(scaledDirection);
    }
  }) ();

var shoot = (function() {
    var negativeZ = new THREE.Vector3(0, 0, -1);
    return function(from, to){
        bullet = new Bullet();
        bullet.position.copy(from.position);
        if(to){
            bullet.direction = to.position.clone().sub(from.position).normalize();
        } else{
            bullet.direction = negativeZ.clone().applyEuler(from.rotation);
        }
        bullets.push(bullet);
        screen.add(bullet);
    }
}) ();