<script lang="ts">
	import Matter from 'matter-js';

	interface Props {
		engineSettings: EngineSettings;
	}

	type EngineSettings = {
		timeScale: number;
		timeState: boolean; // Weather it is played or not
		gravityScale: number;
		gravityX: number;
		gravityY: number;
	};

	let { engineSettings = $bindable() }: Props = $props();

	let container: HTMLDivElement;

	const { Engine, Render, Runner, Bodies, Composite } = Matter;

	let engine = Engine.create();

	// Affects the time
	$effect(() => {
		if (engineSettings.timeState == true) engine.timing.timeScale = engineSettings.timeScale;
		else engine.timing.timeScale = 0;
	});

	// These there affect gravity settings
	$effect(() => {
		engine.gravity.scale = engineSettings.gravityScale;
	});
	$effect(() => {
		engine.gravity.x = engineSettings.gravityX;
	});
	$effect(() => {
		engine.gravity.y = engineSettings.gravityY;
	});

	let render: Matter.Render;

	class Circle {
		circle: Matter.Body;

		constructor(x: number, y: number, radius: number, opts = {}) {
			this.circle = Bodies.circle(x, y, radius, opts);

			Composite.add(engine.world, [this.circle]);
		}
	}

	class Box {
		box: Matter.Body;

		constructor(x: number, y: number, width: number, height: number, opts = {}) {
			this.box = Bodies.rectangle(x, y, width, height, opts);

			Composite.add(engine.world, [this.box]);
		}
	}

	let shapes: Matter.Body[] = [];

	$effect(() => {
		render = Render.create({
			element: container,
			engine: engine,
			options: {
				width: container.clientWidth,
				height: container.clientHeight,
				wireframes: false,
				background: 'transparent'
			}
		});

		Render.run(render);

		const mouse = Matter.Mouse.create(render.canvas);
		const mouseConstraint = Matter.MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.01,
				damping: 0.1
			}
		});

		Composite.add(engine.world, [mouseConstraint]);

		drawStaticBoundaries();

		let runner = Runner.create();
		Runner.run(runner, engine);

		window.addEventListener('resize', resizeCanvas);

		function resizeCanvas() {
			if (container) {
				const { clientWidth: newWidth, clientHeight: newHeight } = container!;

				render.canvas.width = newWidth;
				render.canvas.height = newHeight;
				render.options.width = newWidth;
				render.options.height = newHeight;
			}
		}

		drawObjects();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	});

	function drawStaticBoundaries() {
		let ground = new Box(render.canvas.width / 2, render.canvas.height, render.canvas.width, 60, {
			isStatic: true,
			render: {
				fillStyle: 'green',
				strokeStyle: 'black'
			}
		}).box;

		let rightWall = new Box(0, render.canvas.height / 2, 60, render.canvas.height, {
			isStatic: true
		}).box;

		let leftWall = new Box(
			render.canvas.width,
			render.canvas.height / 2,
			60,
			render.canvas.height,
			{
				isStatic: true
			}
		).box;

		let ceiling = new Box(render.canvas.width / 2, 0, render.canvas.width, 60, {
			isStatic: true
		}).box;

		shapes.push(ground, rightWall, leftWall, ceiling);
	}

	function drawObjects() {
		new Box(100, 100, 40, 100);

		for (let i = 1; i <= 4; i++) {
			for (let j = 1; j <= 4; j++) {
				shapes.push(new Circle(i * 300, j * 200, 50, { friction: 0.1, restitution: 1 }).circle);
				shapes.push(new Box(i * 200, 200, 60, 60, { restitution: 1, friction: 0.1 }).box);
			}
		}
	}
</script>

<div class="flex-grow w-full" bind:this={container}></div>
