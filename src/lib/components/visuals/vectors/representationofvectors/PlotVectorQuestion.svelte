<script lang="ts">
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';
	import type { VisualSection } from '$lib/stores/courses';

	import { fly, slide, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	interface Props {
		section: VisualSection;
		showNextSection: () => void;
	}

	let { section, showNextSection }: Props = $props();

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;

	let plane: Plane;

	let xCord = $state(0);
	let yCord = $state(0);

	let showButton = $state(true);

	// This will be used for styles when the user answered correct
	let answered = $state(false);

	// This will be used for styles when the user in incorrect
	let incorrect = $state(false);

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
		plane.drawGreenVector(true);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(true);
		plane.updateGreenVector(xCord, yCord, true);

		requestAnimationFrame(loop);
	}
</script>

<div
	class="relative flex w-full flex-col border-2 transition xl:aspect-video xl:flex-row {answered
		? 'border-success-500'
		: ''}
  {incorrect ? 'border-error-500' : ''} {!answered && !incorrect ? 'border-transparent' : ''}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	{#if incorrect}
		<p class="absolute right-5 top-5 text-xl text-error-500" transition:fade>incorrect</p>
	{/if}
	<section class="h-[30rem] xl:h-auto xl:flex-[2_1_0]">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section class="bg-surface-300-600-token flex flex-col p-10 md:flex-row xl:flex-[1_1_0]">
		<div class="flex flex-1 flex-col justify-center gap-10">
			<h4 class="h4">Draw the vector <strong>v( 7 , 5 )</strong></h4>
			<div class="flex flex-col gap-10">
				<div class="flex w-60 items-center gap-3">
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
				<div class="flex w-60 items-center gap-3">
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
		<div class="flex flex-1 items-end justify-end">
			<button class="variant-filled-primary btn mt-5" onclick={submitAnswer}>Submit</button>
		</div>
	</section>
</div>
{#if showButton}
	<div class="mt-9 flex w-full items-center justify-end pb-2">
		<button
			class="variant-filled-primary btn mr-6 scale-110 animate-bounce shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				showButton = false;
			}}>Too Hard?</button
		>
	</div>
{/if}
