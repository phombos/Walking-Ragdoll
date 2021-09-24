class player{
  constructor(pos, density){
    this.position = pos;
    this.density = density;
    this.fixDef = {
      density: this.density * 0.1,
      friction: 1,
      restitution: 0.3,
      filterGroupIndex: -1
    };
    
    this.bodyDef = {
    	position: this.position,
    	linearDamping: 2
    };
    
    this.feetFixDef = {
      density: this.density * 0.7,
      friction: 0.9,
      restitution: 0.3,
      filterGroupIndex: -1
    }
    this.ka1 = Math.PI * 0.1;
    this.ka2 = Math.PI * -0.1;
    this.cra1 = 0;
    this.cra2 = 0;
    this.dead = false
  };

  bodyParts(){
    //head
    this.head = world.createDynamicBody(this.bodyDef);
    this.head.createFixture(pl.Polygon([
      Vec2(2, 4),
      Vec2(4, 2),
      Vec2(4, -2),
      Vec2(3, -4),
      Vec2(-2, -4),
      Vec2(-3, -1),
      Vec2(-3, 2),
      Vec2(-1, 4)
    ]), this.fixDef);
    this.head.createFixture(pl.Polygon([
      Vec2(4, 1),
      Vec2(4, -2),
      Vec2(5, -2)
    ]), this.fixDef);
    this.head.createFixture(pl.Polygon([
      Vec2(2, -4),
      Vec2(1, -7),
      Vec2(-1.7, -7),
      Vec2(-1.7, -4)
    ]), this.fixDef);

    this.head.setUserData("head");
    //body
    this.body = world.createDynamicBody(this.bodyDef);
    this.body.createFixture(pl.Polygon([
      Vec2(3, -6),
      Vec2(4, -10),
      Vec2(3, -15),
      Vec2(-2, -15),
      Vec2(-3, -10),
      Vec2(-2, -6)
    ]), this.fixDef);
    this.body.createFixture(pl.Polygon([
      Vec2(3, -15),
      Vec2(4, -19),
      Vec2(2, -21),
      Vec2(-1, -21),
      Vec2(-3, -19),
      Vec2(-2, -15)
    ]), this.fixDef);

    //thighs
    this.upperLeg1 = world.createDynamicBody(this.bodyDef);
    this.upperLeg1.createFixture(pl.Polygon([
      Vec2(-1, -17),
      Vec2(2, -17),
      Vec2(4, -20),
      Vec2(3, -30),
      Vec2(2, -31),
      Vec2(0, -31),
      Vec2(-1, -30),
      Vec2(-3, -20)
    ]), this.fixDef);

    this.upperLeg2 = world.createDynamicBody(this.bodyDef);
    this.upperLeg2.createFixture(pl.Polygon([
      Vec2(-1, -17),
      Vec2(2, -17),
      Vec2(4, -20),
      Vec2(3, -30),
      Vec2(2, -31),
      Vec2(0, -31),
      Vec2(-1, -30),
      Vec2(-3, -20)
    ]), this.fixDef);

    //calves
    this.lowerLeg1 = world.createDynamicBody(this.bodyDef);
    this.lowerLeg1.createFixture(pl.Polygon([
      Vec2(2, -29),
      Vec2(3, -30),
      Vec2(2, -42),
      Vec2(-0.7, -42),
      Vec2(-1, -30),
      Vec2(0, -29)
    ]), this.fixDef);

    this.lowerLeg2 = world.createDynamicBody(this.bodyDef);
    this.lowerLeg2.createFixture(pl.Polygon([
      Vec2(2, -29),
      Vec2(3, -30),
      Vec2(2, -42),
      Vec2(-0.7, -42),
      Vec2(-1, -30),
      Vec2(0, -29)
    ]), this.fixDef);

    //feet
    this.foot1 = world.createDynamicBody(this.bodyDef);
    this.foot1.createFixture(pl.Polygon([
      Vec2(-0.7, -42),
      Vec2(2, -42),
      Vec2(7, -43),
      Vec2(7, -44),
      Vec2(-1, -44)
    ]), this.feetFixDef);

    this.foot2 = world.createDynamicBody(this.bodyDef);
    this.foot2.createFixture(pl.Polygon([
      Vec2(-0.7, -42),
      Vec2(2, -42),
      Vec2(7, -43),
      Vec2(7, -44),
      Vec2(-1, -44)
    ]), this.feetFixDef);

    //arms
    this.upperArm1 = world.createDynamicBody(this.bodyDef);
    this.upperArm1.createFixture(pl.Polygon([
      Vec2(-1, -6),
      Vec2(1, -6),
      Vec2(2, -8),
      Vec2(1, -16),
      Vec2(-1, -16),
      Vec2(-2, -8)
    ]), this.fixDef);

    this.upperArm2 = world.createDynamicBody(this.bodyDef);
    this.upperArm2.createFixture(pl.Polygon([
      Vec2(-1, -6),
      Vec2(1, -6),
      Vec2(2, -8),
      Vec2(1, -16),
      Vec2(-1, -16),
      Vec2(-2, -8)
    ]), this.fixDef);

    this.lowerArm1 = world.createDynamicBody(this.bodyDef);
    this.lowerArm1.createFixture(pl.Polygon([
      Vec2(-1, -16),
      Vec2(1, -16),
      Vec2(0.7, -25),
      Vec2(-1, -25)
    ]), this.fixDef);
    this.lowerArm1.createFixture(pl.Polygon([
      Vec2(-1, -25),
      Vec2(0.7, -25),
      Vec2(1.6, -27),
      Vec2(1, -28),
      Vec2(-0.5, -28),
      Vec2(-1.5, -27)
    ]), this.fixDef);

    this.lowerArm2 = world.createDynamicBody(this.bodyDef);
    this.lowerArm2.createFixture(pl.Polygon([
      Vec2(-1, -16),
      Vec2(1, -16),
      Vec2(0.7, -25),
      Vec2(-1, -25)
    ]), this.fixDef);
    this.lowerArm2.createFixture(pl.Polygon([
      Vec2(-1, -25),
      Vec2(0.7, -25),
      Vec2(1.6, -27),
      Vec2(1, -28),
      Vec2(-0.5, -28),
      Vec2(-1.5, -27)
    ]), this.fixDef);
  };

  joints(){
    this.neck = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0.1,
      lowerAngle: Math.PI * -0.1
    }, this.head, this.body, Vec2.add(this.position, Vec2(0.5, -6))));

    this.crotch1 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0.4,
      lowerAngle: Math.PI * -0.4
    }, this.upperLeg1, this.body, Vec2.add(this.position, Vec2(0.08, -18.5))));

    this.crotch2 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0.4,
      lowerAngle: Math.PI * -0.4
    }, this.upperLeg2, this.body, Vec2.add(this.position, Vec2(0.08, -18.5))));

    this.knee1 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0,
      lowerAngle: Math.PI * -0.8
    }, this.upperLeg1, this.lowerLeg1, Vec2.add(this.position, Vec2(1, -30))));

    this.knee2 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0,
      lowerAngle: Math.PI * -0.8
    }, this.upperLeg2, this.lowerLeg2, Vec2.add(this.position, Vec2(1, -30))));

    this.ankle1 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0.23,
      lowerAngle: Math.PI * -0.23
    }, this.lowerLeg1, this.foot1, Vec2.add(this.position, Vec2(1, -42))));

    this.ankle2 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0.23,
      lowerAngle: Math.PI * -0.23
    }, this.lowerLeg2, this.foot2, Vec2.add(this.position, Vec2(1, -42))));

    this.shoulder1 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: false
    }, this.upperArm1, this.body, Vec2.add(this.position, Vec2(0, -7))));

    this.shoulder2 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: false
    }, this.upperArm2, this.body, Vec2.add(this.position, Vec2(0, -7))));

    this.elbow1 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0,
      lowerAngle: Math.PI * -0.85
    }, this.lowerArm1, this.upperArm1, Vec2.add(this.position, Vec2(0, -16))));

    this.elbow2 = world.createJoint(pl.RevoluteJoint({
      enableMotor: false,
      enableLimit: true,
      upperAngle: Math.PI * 0,
      lowerAngle: Math.PI * -0.85
    }, this.lowerArm2, this.upperArm2, Vec2.add(this.position, Vec2(0, -16))));
  };

  muscle(){
    this.calve1 = world.createJoint(pl.MotorJoint({
      maxTorque : 5000
    }, this.upperLeg1, this.lowerLeg1));

    this.calve2 = world.createJoint(pl.MotorJoint({
      maxTorque : 5000
    }, this.upperLeg2, this.lowerLeg2));

    this.thigh1 = world.createJoint(pl.MotorJoint({
      maxTorque : 5000
    }, this.upperLeg1, this.body));

    this.thigh2 = world.createJoint(pl.MotorJoint({
      maxTorque : 5000
    }, this.upperLeg2, this.body));

    this.arm1 = world.createJoint(pl.MotorJoint({
      maxTorque : 300
    }, this.upperArm1, this.body));

    this.arm2 = world.createJoint(pl.MotorJoint({
      maxTorque : 300
    }, this.upperArm2, this.body));

    this.lowerarm1 = world.createJoint(pl.MotorJoint({
      maxTorque : 90
    }, this.upperArm1, this.lowerArm1));

    this.lowerarm2 = world.createJoint(pl.MotorJoint({
      maxTorque : 90
    }, this.upperArm2, this.lowerArm2));
  }

  control(keypress){
    if(keypress["87"]){
			this.cra1 += toRad(1.5);
			this.cra2 += toRad(-1.5);
		};
		if(keypress["81"]){
			this.cra1 += toRad(-1.5);
			this.cra2 += toRad(1.5);
		};
    this.cra1 = clamp(this.cra1, Math.PI * -0.8, 0);
    this.cra2 = clamp(this.cra2, Math.PI * -0.8, 0);
    this.calve1.setAngularOffset(this.cra1);
		this.calve2.setAngularOffset(this.cra2);

    if(keypress["82"]){
			this.ka1 += toRad(1.5);
			this.ka2 += toRad(-1.5);
		};
		if(keypress["69"]){
			this.ka1 += toRad(-1.5);
			this.ka2 += toRad(1.5);
		};
    this.ka1 = clamp(this.ka1, Math.PI * -0.4, Math.PI * 0.4);
    this.ka2 = clamp(this.ka2, Math.PI * -0.4, Math.PI * 0.4);
    this.thigh1.setAngularOffset(this.ka1);
		this.thigh2.setAngularOffset(this.ka2);
    this.arm1.setAngularOffset(Math.PI * 0.13);
		this.arm2.setAngularOffset(Math.PI * -0.13);
    this.lowerarm1.setAngularOffset(Math.PI * 0.25);
		this.lowerarm2.setAngularOffset(Math.PI * 0.25);
  }

  deleteAllJoints(){
    world.destroyJoint(this.neck);
    world.destroyJoint(this.knee1);
    world.destroyJoint(this.knee2);
    world.destroyJoint(this.ankle1);
    world.destroyJoint(this.ankle2);
    world.destroyJoint(this.crotch1);
    world.destroyJoint(this.crotch2);
    world.destroyJoint(this.shoulder1);
    world.destroyJoint(this.shoulder2);
    world.destroyJoint(this.elbow1);
    world.destroyJoint(this.elbow2);
  }

  deleteAllMuscle(){
    world.destroyJoint(this.calve1);
    world.destroyJoint(this.calve2);
    world.destroyJoint(this.thigh1);
    world.destroyJoint(this.thigh2);
    world.destroyJoint(this.arm1);
    world.destroyJoint(this.arm2);
    world.destroyJoint(this.lowerarm1);
    world.destroyJoint(this.lowerarm2);
  }
};

function clamp(n, min, max){
  if(n < min){
    return(min);
  } else if (n > max) {
    return(max);
  } else{
    return(n);
  }
}
