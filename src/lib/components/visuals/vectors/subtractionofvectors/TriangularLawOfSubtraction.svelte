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

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 8);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(false);

		// Purple
		plane.drawFloatingVector(4, 7, 5.9, 1.2, false, { head: false, tail: true }, 'purple');
		plane.writeText(6, 4, 'U - V', 'purple', 1.3);

		// Green
		plane.drawFloatingVector(1, 2, 6, 1, false, { head: false, tail: true }, 'green');
		plane.writeText(3, 1, 'V', 'green', 1.3);

		// Red
		plane.drawFloatingVector(1, 2, 4, 7, false, { head: false, tail: true }, 'red');
		plane.writeText(2, 5, 'U', 'red', 1.3);

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
