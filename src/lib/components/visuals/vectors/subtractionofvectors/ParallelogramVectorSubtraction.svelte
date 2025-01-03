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

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 8);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(false);

		// Green
		plane.drawFloatingVector(5, 4, 4, 7, false, { head: false, tail: true }, 'green');
		plane.writeText(5, 6, 'V', 'green', 1.3);

		// Green
		plane.drawFloatingVector(
			5,
			4,
			6,
			1,
			false,
			{ head: false, tail: true },
			'rgba( 0, 255, 0, 0.2)'
		);
		plane.writeText(5.7, 3, '-V', 'green', 1.3);

		// Red
		plane.drawFloatingVector(1, 4, 5, 4, false, { head: false, tail: true }, 'red');
		plane.writeText(3, 4.5, 'U', 'red', 1.3);

		// Purple
		plane.drawFloatingVector(1, 4, 6, 1, false, { head: false, tail: true }, 'purple');
		plane.writeText(3, 2, 'U - V', 'purple', 1.3);

		requestAnimationFrame(loop);
	}
</script>

<main class="mx-auto grid aspect-video w-2/3 place-items-center">
	<div class="aspect-square h-full">
		<canvas bind:this={canvas}></canvas>
	</div>
</main>

{#if showButton}
	<div class="mt-9 flex w-2/3 items-center justify-end pb-2">
		<button
			class="variant-filled-primary btn mr-6 scale-110 animate-bounce shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				showButton = false;
			}}>Continue</button
		>
	</div>
{/if}
