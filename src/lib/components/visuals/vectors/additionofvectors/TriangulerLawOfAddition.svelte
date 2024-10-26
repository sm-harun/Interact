<script lang="ts">
	import type { Section } from '$lib/stores/courses';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';

	interface Props {
		section: Section;
		showNextSection: () => void;
	}

	let { section, showNextSection }: Props = $props();

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;

	let showButton = $state(true);

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

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 6);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(false);

		// Resultant
		plane.drawFloatingVector(0, 1, 4, 4, false, { head: false, tail: false }, 'purple');
		plane.writeText(1.5, 3, 'U + V', 'purple', 1.5);

		// Green
		plane.drawFloatingVector(4, 1, 4, 4, false, { head: false, tail: true }, 'green');
		plane.writeText(4.5, 2.5, 'V', 'green', 1.5);

		// Red
		plane.drawFloatingVector(0, 1, 4, 1, false, { head: false, tail: true }, 'red');
		plane.writeText(2.3, 0.5, 'U', 'red', 1.5);

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
			onclick={() => {
				showNextSection();
				showButton = false;
			}}>Continue</button
		>
	</div>
{/if}
