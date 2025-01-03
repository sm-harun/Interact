import Matter from 'matter-js';

const { Engine, Bodies, Composite, Runner, Render, World } = Matter;

// export const bodies: Writable<Matter.Body[]> = writable([]);
export const shapes: Matter.Body[] = [];
export const engine: Matter.Engine = Engine.create();

export const engineSettings: EngineSettings = $state({
	timeScale: 1,
	timeState: true,
	gravityScale: 0.001,
	gravityX: 0,
	gravityY: 1
});

type shapeStats = {
	id: number;
	type: 'Static' | 'Dynamic';
	name: string;
	fillStyle: string;
	x: number;
	y: number;
};

export const shapeStats: { id: number; name: string; x: number; y: number; fillStyle: string }[] =
	$state([]);

let canvasWidth: number;
let canvasHeight: number;

export function updateCanvasSize(newWidth: number, newHeight: number) {
	canvasWidth = newWidth;
	canvasHeight = newHeight;
}

export function start(render: Matter.Render) {
	updateCanvasSize(render.canvas.width, render.canvas.height);

	// drawObjects();

	Render.run(render);

	Composite.add(engine.world, [createMouseConstraint(render.canvas)]);

	const runner = Runner.create();
	Runner.run(runner, engine);
}

export function addNewObject(bodies: Matter.Body[]) {
	bodies.forEach((body) => {
		shapes.push(body);
		Composite.add(engine.world, [body]);
		shapeStats.push({
			id: body.id,
			name: body.plugin.name,
			type: body.isStatic ? 'Static' : 'Dynamic',
			x: body.position.x,
			y: body.position.y,
			fillStyle: body.render.fillStyle
		});
	});
}

export function removeObject(objectId: number) {
	const shapeIndex = shapes.findIndex((shape) => shape.id == objectId);
	World.remove(engine.world, shapes[shapeIndex]);
	shapes.splice(shapeIndex, 1);

	shapeStats.splice(
		shapeStats.findIndex((shape) => shape.id == objectId),
		1
	);
}

function drawObjects() {
	for (let i = 1; i <= 4; i++) {
		for (let j = 1; j <= 4; j++) {
			addNewObject([
				Bodies.circle(i * 300, j * 200, 50, {
					friction: 0.1,
					restitution: 1,
					plugin: { name: `Circle ${i + j - 1}` }
				})
			]);
			addNewObject([
				Bodies.rectangle(i * 200, 200, 60, 60, {
					restitution: 1,
					friction: 0.1,
					plugin: { name: `Box ${i + j - 1}` }
				})
			]);
		}
	}
}

function createMouseConstraint(canvas: HTMLCanvasElement) {
	const mouse = Matter.Mouse.create(canvas);
	const mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.01,
			damping: 0.1
		}
	});

	return mouseConstraint;
}

export function createBarrier(type: 'ground' | 'ceiling' | 'wall-right' | 'wall-left') {
	switch (type) {
		case 'ground':
			drawGround();
			return;
		case 'ceiling':
			drawCeiling();
			return;
		case 'wall-left':
			drawRightWall();
			return;
		case 'wall-right':
			drawLeftWall();
			return;
	}
}

function drawGround() {
	addNewObject([
		Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 60, {
			isStatic: true,
			plugin: { name: 'Ground' }
		})
	]);
}

function drawLeftWall() {
	addNewObject([
		Bodies.rectangle(canvasWidth, canvasHeight / 2, 60, canvasHeight, {
			isStatic: true,
			plugin: { name: 'Left Wall' }
		})
	]);
}

function drawRightWall() {
	addNewObject([
		Bodies.rectangle(0, canvasHeight / 2, 60, canvasWidth, {
			isStatic: true,
			plugin: { name: 'Right Wall' }
		})
	]);
}

function drawCeiling() {
	addNewObject([
		Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 60, {
			isStatic: true,
			plugin: { name: 'Ceiling' }
		})
	]);
}
