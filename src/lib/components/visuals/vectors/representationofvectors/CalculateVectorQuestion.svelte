<script lang="ts">
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';

	interface Props {
		section: any;
		showNextSection: () => void;
	}

	let { section, showNextSection }: Props = $props();

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;

	onMount(() => {
		let parent = canvas.parentElement;
		ctx = canvas.getContext('2d');

		if (parent) {
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;

			window.addEventListener('resize', () => {
				canvas.width = parent.clientWidth;
			});
		}
		let plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 15);

		function loop() {
			plane.clear();
			plane.drawFirstQuadrant(true);
			plane.drawFloatingVector(2, 4, 12, 8, true, { head: true, tail: false }, 'green');

			requestAnimationFrame(loop);
		}
		loop();

		showNextSection();
	});
</script>

<main class="w-full aspect-video grid place-items-center">
	<div class="h-full aspect-square">
		<canvas bind:this={canvas}></canvas>
	</div>
</main>
