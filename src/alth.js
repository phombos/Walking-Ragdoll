function toRad(degrees){
    return(degrees / (180 / Math.PI));
}

function toDeg(radians){
    return(radians * (180 / Math.PI));
}

function printText(x, y, text, size, color){
	ctx.fillStyle = color ;
	ctx.font = size + "px Arial";
	ctx.fillText(text , x, y);
}

/*if(keypress["65"]){
	//jt.enableMotor(true);
	//jt.setMotorSpeed(1000000);
	jt2.enableMotor(true);
	jt2.setMotorSpeed(100);
}else if(keypress["68"]){
	jt.enableMotor(true);
	jt.setMotorSpeed(-100);
	//jt2.enableMotor(true);
	//jt2.setMotorSpeed(-1000000);
}else{
	jt.enableMotor(false);
	jt2.enableMotor(false);
}

let chassis = world.createDynamicBody({
	position: Vec2(0, 52.5),
});

chassis.createFixture(pl.Box(4, 1.75), {
	density: 0.1,
	friction: 0.6,
	restitution: 0.4
});

let box = world.createDynamicBody({
	position: Vec2(20, 20),
	angle: toRad(0)
});

box.createFixture(pl.Box(1.5, 1.5), {
	density: 0.1,
	friction: 0.1,
	restitution: 0.2
});

let box2 = world.createDynamicBody({
	position: Vec2(20, 21.5),
	angle: toRad(0)
});

box2.createFixture(pl.Box(1.5, 1.5), {
	density: 0.1,
	friction: 0.1,
	restitution: 0.2
});

let circle = world.createDynamicBody({
	position: Vec2(-2.5, 50),
	angle: 0
});
circle.createFixture(pl.Circle(1), {
	density: 0.7,
	friction: 0.7,
	restitution: 0.8
});

let circle2 = world.createDynamicBody({
	position: Vec2(2.5, 50),
	angle: 0
});
circle2.createFixture(pl.Circle(1), {
	density: 0.7,
	friction: 0.7,
	restitution: 0.8
});
*/