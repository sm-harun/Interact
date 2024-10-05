<script lang="ts">
	import type { Section } from '$lib/stores/courses';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';

	export let section: Section;
	export let showNextSection: () => void;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let showButton = true;

	let plane: Plane;

	onMount(() => {
		ctx = canvas.getContext('2d');
		let parent = canvas.parentElement;

		if (parent) {
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;

			window.addEventListener('resize', () => {
				canvas.width = parent.clientWidth;
			});
		}

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 12);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(false);

		// Resultant
		plane.drawFloatingVector(1, 3, 4, 10, false, { head: false, tail: true }, 'purple');
		plane.writeText(1.3, 7, 'U + V + W', 'purple', 1.1);

		// Red + Green
		plane.drawFloatingVector(8, 1, 4, 10, false, { head: false, tail: true }, 'yellow');
		plane.writeText(7, 6, 'V + W', 'yellow', 1.3);

		// Blue + Red
		plane.drawFloatingVector(1, 3, 10, 6, false, { head: false, tail: true }, 'lightBlue');
		plane.writeText(5, 3.5, 'U + V', 'lightBlue', 1.3);

		// Green
		plane.drawFloatingVector(10, 6, 4, 10, false, { head: false, tail: true }, 'green');
		plane.writeText(7, 9, 'W', 'green', 1.5);

		// Red
		plane.drawFloatingVector(8, 1, 10, 6, false, { head: false, tail: true }, 'red');
		plane.writeText(9.5, 3, 'V', 'red', 1.5);

		// Blue
		plane.drawFloatingVector(1, 3, 8, 1, false, { head: false, tail: true }, 'blue');
		plane.writeText(5, 1, 'U', 'blue', 1.5);

		requestAnimationFrame(loop);
	}
</script>

<main class="w-2/3 aspect-video grid place-items-center mx-auto">
	<div class="h-full aspect-square">
		<canvas bind:this={canvas}></canvas>
	</div>
</main>

{#if showButton}
	<div class="w-2/3 pb-2 flex justify-end items-center mt-9">
		<button
			class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			on:click={() => {
				showNextSection();
				showButton = false;
			}}>Continue</button
		>
	</div>
{/if}
