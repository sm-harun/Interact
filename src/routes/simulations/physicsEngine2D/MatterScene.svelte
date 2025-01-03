<script lang="ts">
	import Matter from 'matter-js';
	import { engine } from './states.svelte';
	import { start, engineSettings, updateCanvasSize } from './states.svelte';

	let container: HTMLDivElement;

	const { Render } = Matter;

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
	});

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
