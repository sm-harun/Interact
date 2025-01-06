<script lang="ts">
	import Matter from 'matter-js';
	import { engine } from './states.svelte';
	import { start, engineSettings, updateCanvasSize, shapes } from './states.svelte';
	import { getPartsBeforeAndAfterLetter } from '$lib/utils';

	let container: HTMLDivElement;

	const { Render } = Matter;

	let seconds = [1, 3, 5];

	setInterval(() => {
		seconds[0] += 0.01;
		if (seconds[0] > 5) seconds[0] = 1;

		seconds[1] += 0.01;
		if (seconds[1] > 5) seconds[1] = 1;

		seconds[2] += 0.01;
		if (seconds[2] > 5) seconds[2] = 1;
		console.log(`Counter: ${seconds}`);
	}, 10);

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

		start(render);

		requestAnimationFrame(() => additions(render.context));
	});

	function additions(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();

		shapes.forEach((shape) => {
			let xo = shape.position.x;
			let yo = shape.position.y;

			let lineColor = 'grey';

			if (shape.label == 'Circle Body') {
				let sign = Math.sign(shape.plugin.charge);

				// The power of the charge
				let power = parseInt(
					getPartsBeforeAndAfterLetter(shape.plugin.charge.toExponential(0), 'e').after
				);
				let lineCount = shape.plugin.charge == 0 ? 0 : power + 6;
				let division = (Math.PI * 2) / lineCount;

				console.log(sign);

				// Defines how big one unit of vector is
				let unit = shape.circleRadius as number;
				let magnitude = 5;

				for (let i = 0; i < lineCount; i++) {
					// Position on the circumfrence of the circle to move too
					let edgeX = unit * Math.cos(division * i);
					let edgeY = unit * Math.sin(division * i);

					drawALine(
						ctx,
						{ x: xo + edgeX, y: yo - edgeY },
						{ x: xo + edgeX * magnitude, y: yo - edgeY * magnitude },
						lineColor,
						1
					);

					for (let k = 0; k < 3; k++) {
						let sec = sign > 0 ? seconds[k] : 6 - seconds[k];

						let triangleVerticies = getTriangleVerticies(
							sec * 1.8,
							{ x: xo + edgeX * sec, y: yo - edgeY * sec },
							Math.atan2(edgeY * sign, edgeX * sign)
						);

						drawTriangle(ctx, triangleVerticies, lineColor);
					}
				}
			}

			ctx.stroke();
		});

		ctx.closePath();

		requestAnimationFrame(() => additions(ctx));
	}

	function drawALine(
		ctx: CanvasRenderingContext2D,
		pos1: { x: number; y: number },
		pos2: { x: number; y: number },
		color: string = 'grey',
		thickness: number = 3
	) {
		ctx.beginPath();

		ctx.moveTo(pos1.x, pos1.y);
		ctx.lineTo(pos2.x, pos2.y);

		ctx.lineWidth = thickness;
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	// r decides how big the triangle will be
	// angle is the inverse tangent of the slope of the line
	function getTriangleVerticies(r: number, startingCord: { x: number; y: number }, angle: number) {
		let firstAngle = angle;
		let secAngle = angle + (3 * Math.PI) / 4;
		let thirdAngle = angle + (5 * Math.PI) / 4;

		return [
			{
				x: startingCord.x + r * Math.cos(firstAngle),
				y: startingCord.y - r * Math.sin(firstAngle)
			},
			{
				x: startingCord.x + r * Math.cos(secAngle),
				y: startingCord.y - r * Math.sin(secAngle)
			},
			{
				x: startingCord.x + r * Math.cos(thirdAngle),
				y: startingCord.y - r * Math.sin(thirdAngle)
			}
		];
	}

	function drawTriangle(
		ctx: CanvasRenderingContext2D,
		verticies: { x: number; y: number }[],
		color: string
	) {
		ctx.beginPath();

		ctx.moveTo(verticies[0].x, verticies[0].y);
		ctx.lineTo(verticies[1].x, verticies[1].y);
		ctx.lineTo(verticies[2].x, verticies[2].y);
		ctx.lineTo(verticies[0].x, verticies[0].y);

		ctx.fillStyle = color;
		ctx.fill();
	}

	window.addEventListener('resize', resizeCanvas);

	function resizeCanvas() {
		const { clientWidth: newWidth, clientHeight: newHeight } = container;
		render.canvas.width = newWidth;
		render.canvas.height = newHeight;
		render.options.width = newWidth;
		render.options.height = newHeight;

		updateCanvasSize(render.canvas.width, render.canvas.height);
	}

	$effect.pre(() => {
		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<div class="w-full flex-grow" bind:this={container}></div>
