<script lang="ts">
	import Matter from 'matter-js';
	import { engine } from './states.svelte';
	import { start, engineSettings } from './states.svelte';

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

		// window.addEventListener('resize', resizeCanvas);
		//
		// function resizeCanvas() {
		// 	if (container) {
		// 		const { clientWidth: newWidth, clientHeight: newHeight } = container!;
		//
		// 		render.canvas.width = newWidth;
		// 		render.canvas.height = newHeight;
		// 		render.options.width = newWidth;
		// 		render.options.height = newHeight;
		// 	}
		// }

		start(render);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<div class="flex-grow w-full" bind:this={container}></div>
