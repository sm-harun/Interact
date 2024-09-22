<script lang="ts">
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';
	import type { VisualSection } from '$lib/stores/courses';

	import { fly, slide, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let section: VisualSection;
	export let showNextSection: () => void;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let plane: Plane;

	let xCord = 0;
	let yCord = 0;

	let showButton = true;

	// This will be used for styles when the user answered correct
	let answered = false;

	// This will be used for styles when the user in incorrect
	let incorrect = false;

	function submitAnswer() {
		if (xCord === 7 && yCord === 5) {
			if (showButton != false) showNextSection();
			incorrect = false;
			answered = true;
			showButton = false;
		} else {
			incorrect = true;
		}
	}

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

		plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 15);
		plane.drawMainVector(true);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(true);
		plane.updateMainVector(xCord, yCord, true);

		requestAnimationFrame(loop);
	}
</script>

<div
	class="w-full xl:aspect-video flex flex-col xl:flex-row relative transition border-2 {answered
		? 'border-success-500'
		: ''}
  {incorrect ? 'border-error-500' : ''} {!answered && !incorrect ? 'border-transparent' : ''}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	{#if incorrect}
		<p class="text-xl text-error-500 absolute top-5 right-5" transition:fade>incorrect</p>
	{/if}
	<section class="h-[30rem] xl:h-auto xl:flex-[2_1_0]">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section class="xl:flex-[1_1_0] bg-surface-700 p-10 flex flex-col md:flex-row">
		<div class="flex-1 flex flex-col justify-center gap-10">
			<h4 class="h4">Draw the vector <strong>v( 7 , 5 )</strong></h4>
			<div class="flex flex-col gap-10">
				<div class="w-60 flex items-center gap-3">
					<span class="text-xl font-bold">X</span>
					<input
						class="flex-shrink-0"
						type="range"
						bind:value={xCord}
						min="0"
						max="10"
						step={0.1}
					/>
					<span class="text-2xl font-bold">{xCord}</span>
				</div>
				<div class="w-60 flex gap-3 items-center">
					<span class="text-xl font-bold">Y</span>
					<input
						class="flex-shrink-0"
						type="range"
						bind:value={yCord}
						min="0"
						max="10"
						step={0.1}
					/>
					<span class="text-2xl font-bold">{yCord}</span>
				</div>
			</div>
		</div>
		<div class="flex-1 flex justify-end items-end">
			<button class="btn variant-filled-primary mt-5" on:click={submitAnswer}>Submit</button>
		</div>
	</section>
</div>
{#if showButton}
	<div class="w-full pb-2 flex justify-end items-center mt-9">
		<button
			class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			on:click={() => {
				showNextSection();
				showButton = false;
			}}>Too Hard?</button
		>
	</div>
{/if}
