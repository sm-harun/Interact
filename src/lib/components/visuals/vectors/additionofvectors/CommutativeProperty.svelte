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

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 20);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(false);

		// Red 2
		plane.drawFloatingVector(8, 12, 16, 12, false, { head: false, tail: true }, 'red');
		plane.writeText(12, 13, 'U', 'red', 2);

		// Green 2
		plane.drawFloatingVector(1, 6, 8, 12, false, { head: false, tail: true }, 'green');
		plane.writeText(4.5, 10, 'V', 'green', 2);

		// Green 1
		plane.drawFloatingVector(10, 6, 16, 12, false, { head: false, tail: true }, 'green');
		plane.writeText(13.5, 8, 'V', 'green', 2);

		// Red 1
		plane.drawFloatingVector(1, 6, 10, 6, false, { head: false, tail: true }, 'red');
		plane.writeText(6, 5, 'U', 'red', 2);

		// Resultant
		plane.drawFloatingVector(1, 6, 16, 12, false, { head: false, tail: true }, 'purple');
		plane.writeText(10, 10.5, 'U + V', 'purple', 1.5);
		plane.writeText(7, 7.5, 'V + U', 'purple', 1.5);

		requestAnimationFrame(loop);
	}
</script>

<main class="w-full aspect-video grid place-items-center mx-auto">
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
