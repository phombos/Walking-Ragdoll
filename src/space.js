const lineWidth = 1;
const d = {stroke: "rgb(200, 200, 200)", fill: "rgb(200, 200, 200, 0.2)"};
const s = {stroke: "rgb(125, 255, 125)", fill: "rgb(125, 255, 125, 0.2)"};

//const d = {stroke: "rgb(0, 90, 200)", fill: "rgb(125, 125, 125, 0)"};
//const s = {stroke: "rgb(125, 125, 125)", fill: "rgb(90, 255, 90, 0)"};


//Vec2 = planck.Vec2;

class Space{
	constructor(data){
		this.camera = data.camera,
		this.scale = data.scale,
		this.cameraVelocity = data.cameraVelocity;
	}
	
	worldPoint(V){
		let v = Vec2(V.x * this.scale + canvas.width / 2, -(V.y * this.scale - canvas.height / 2));
		v.sub(this.camera);
		return(v);
	}
	
	circle(pos, rad, color, fill){
		let p = this.worldPoint(pos);
		
		ctx.beginPath();
		ctx.arc(p.x, p.y, rad * this.scale, 0, 2 * Math.PI, false);
		if(fill){
			ctx.fillStyle = color.fill;
			ctx.fill();
		};
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color.stroke;
		ctx.stroke();
	}
	
	segment(a, b, color){
		let A = this.worldPoint(a);
		let B = this.worldPoint(b);
	
		ctx.strokeStyle = color;
	    	ctx.lineWidth = lineWidth;

	    	ctx.beginPath();
	    	ctx.moveTo(A.x, A.y);
	    	ctx.lineTo(B.x, B.y);
	    	ctx.stroke();
	}

	fill(v, color){
		let V = this.worldPoint(v[0]);
		
		ctx.fillStyle = color;
		ctx.beginPath();
	    	ctx.moveTo(V.x, V.y);
	    	for(let i = 1; i < v.length; i++){
	    		V = this.worldPoint(v[i]);
	    		
	    		ctx.lineTo(V.x, V.y);
	    	}
	    	ctx.fill();
	}
	
	drawCircle(body, shape, color){
		let rad = shape.m_radius;
		let pos = body.getPosition();
		let angle = body.getAngle();
		this.circle(pos, rad, color, true);
		let rod = Vec2(Math.cos(angle), Math.sin(angle));
		rod.mul(rad);
		rod.add(pos);
		this.segment(pos, rod, color.stroke);
	}
	
	drawPolygon(body, shape, color){
		let vert = shape.m_vertices.length;
		let pos = [];
		for(let i = 0; i < vert; i++){
			let vertex = shape.getVertex(i);
			let worldPosition = body.getWorldPoint(vertex);
			pos.push(worldPosition);
		}
		
		this.fill(pos, color.fill);
		
		for(let i = 0; i < pos.length; i++){
			let i2 = i - 1;
			if(i2 == -1){
				i2 = pos.length -1;
			} else if(i2 == pos.length){
				i2 = 0;
			}
			this.segment(pos[i], pos[i2], color.stroke);
		}
	}
	
	drawJoint(joint){
		let a = joint.getAnchorA();
		let b = joint.getAnchorB();
		let color = "rgb(255, 255, 255, 0.7)"
		this.segment(a, b, color);
		color = {stroke: "rgb(255, 255, 255)", fill: "rgb(90, 255, 90, 0.25)"};
		this.circle(a, 0.1, color, false);
		this.circle(b, 0.1, color, false);
	}
	
	drawBodies(world){
		
		for (let body = world.getBodyList(); body; body = body.getNext()) {
			let type = body.getType();
			let color;
			if(type == "dynamic"){
				color = d;
			} else{
				color = s;
			}
			
			for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
				let shape = fixture.getShape();
				let shapeType = fixture.getType();
				if(shapeType == "polygon"){
					this.drawPolygon(body, shape, color);
				} else if(shapeType == "circle"){
					this.drawCircle(body, shape, color);
				}
			}
		}
	}
	
	drawJoints(world){
		for (let joint = world.getJointList(); joint; joint = joint.getNext()) {
	      		this.drawJoint(joint);
    		}
	}
	
	drawContacts(world){
		for (let ce = world.getContactList(); ce; ce = ce.getNext()) {
			this.circle(ce.contact, 2, {
				stroke: "rgb(255, 0, 0)",
				fill: "rgb(255, 0, 0)"
			}, true);
		}
	}
	
	background(color){
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	
	clear(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	applyCameraVelocity(){
		this.camera.add(this.cameraVelocity);
		this.cameraVelocity = Vec2(0 ,0);
	}
}

