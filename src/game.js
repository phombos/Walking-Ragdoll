let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 600;

var pl = planck;
let Vec2 = pl.Vec2;
let gravity = Vec2(0, -40);
let world = pl.World({
	gravity: gravity,
	allowSleep: true
});
let scale = 5;

let mouse = pl.Vec2(0, 0);
let mouseDown;

let keypress = [];

let gFix = {
	density: 0.1,
	friction: 2,
	restitution: 0.4
}

let userData = {
	type: "ground"
}

for(let i = 0; i < 40; i++){
	let x = 1000 - i * 120;
	let y = 0;
	let ground = world.createBody(Vec2(x, y))
	ground.createFixture(pl.Box(60, 1), gFix);
	ground.setUserData("ground");
};


//let g =  Gear(Vec2(0, 100), 3, 12, 0, 0.6);

let p = new player(Vec2(0, 50), 0.3);
p.bodyParts();
p.joints();
p.muscle();

let timeStep = 1 / 60;
let velocityIterations = 10;
let positionIterations = 30;

space = new Space({
	camera: pl.Vec2(0, 0),
	scale: 10,
	cameraVelocity: Vec2(0, 0)
});

window.requestAnimationFrame(function loop(){
	space.clear();
	space.background("rgb(0, 0, 0)");
	space.drawBodies(world);
	//space.drawJoints(world);
	world.step(timeStep, velocityIterations, positionIterations);
	world.clearForces();

	p.control(keypress);

	for (let ce = p.head.getContactList(); ce; ce = ce.next) {
		if(p.dead){
			break;
		}
		let contact = ce.contact;

		let fixture = contact.getFixtureA();

		let body = fixture.getBody();

		let userData = body.getUserData();

		if (userData == "ground") {
			p.deleteAllMuscle();
			p.deleteAllJoints();
			p.dead = true;
		}
	}

	space.camera.x = p.body.getWorldCenter().x * space.scale;
	space.camera.y = -(p.body.getWorldCenter().y - 4) * space.scale;

	printText(20, 20, "SCORE: " + Math.round(p.body.getWorldCenter().x / 10) + " m", 20, "white");
	printText(20, 35, "Q, W to control calves", 15, "white");
	printText(20, 50, "E, R to control thighs", 15, "white");

	window.requestAnimationFrame(loop);
});

window.addEventListener("mousemove", function(event){
	let rect = canvas.getBoundingClientRect();
	mouse.x = Math.round(event.clientX - rect.left);
	mouse.y = Math.round(event.clientY - rect.top);
});

window.addEventListener("mousedown", function(event){
	mouseDown = true;
});

window.addEventListener("mouseup", function(event){
	mouseDown = false;
});

window.addEventListener("keydown", function(e){
	keypress[e.keyCode] = true;
});



window.addEventListener("keyup", function(e){
	keypress[e.keyCode] = false;
})