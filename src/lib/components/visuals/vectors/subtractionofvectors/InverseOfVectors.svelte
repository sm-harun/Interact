<script lang="ts">
	import type { Section } from '$lib/stores/courses';
	import { fly, slide, fade } from 'svelte/transition';
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

	let plane: Plane;

	let showButton = $state(true);

	let greenVector = $state({ x: 0, y: 0 });

	// A variable to check shadow state for resultant vector
	let inverseVector = $state(false);

	// This checks if the answer has been filled correctly
	let explained = false;

	let wrongAnswer = false;

	onMount(() => {
		ctx = canvas.getContext('2d');
		let parent = canvas.parentElement;

		if (parent) {
			canvas.width = parent.clientWidth;
			canvas.height = parent.clientHeight;

			window.addEventListener('resize', () => {
				canvas.width = parent.clientWidth;
			});

			plane = new Plane(canvas, ctx, parent.clientWidth, parent.clientHeight, 25);
		} else {
			console.error(parent, 'is not defined');
		}

		plane.drawGreenVector(true);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFullPlane();
		if (inverseVector) {
			plane.updateGreenVector(-greenVector.x, -greenVector.y, true);
		} else {
			plane.updateGreenVector(greenVector.x, greenVector.y, true);
		}

		requestAnimationFrame(loop);
	}
</script>

<div
	class="relative flex w-full flex-col border-2 transition xl:aspect-video xl:flex-row {explained
		? 'border-success-500'
		: wrongAnswer
			? 'border-error-500'
			: 'border-transparent'}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	{#if wrongAnswer}
		<p class="absolute right-5 top-3 text-xl text-error-500" transition:fade>incorrect</p>
	{/if}
	<section class="h-[30rem] xl:h-auto xl:flex-[2_1_0]">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section
		class="bg-surface-300-600-token flex h-full flex-1 flex-wrap gap-4 p-10 sm:flex-col lg:gap-0"
	>
		<h1 class="h4 pb-10">Play around with the vector and See the effects when it is inversed</h1>
		<div class="flex w-full flex-1 flex-col justify-center gap-5">
			{#if inverseVector}
				<p class="mb-5 text-3xl font-bold">V = ({-greenVector.x}, {-greenVector.y})</p>
			{:else}
				<p class="mb-5 text-3xl font-bold">V = ({greenVector.x}, {greenVector.y})</p>
			{/if}
			<div class="flex w-48 gap-2">
				<span>X </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="-10"
					max="10"
					step={0.1}
					bind:value={greenVector.x}
				/>
				<p>{greenVector.x}</p>
			</div>
			<div class="mt-3 flex w-48 gap-2">
				<span>Y </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="-10"
					max="10"
					step={0.1}
					bind:value={greenVector.y}
				/>
				<p>{greenVector.y}</p>
			</div>
		</div>
		<div>
			<button
				class="btn {inverseVector ? 'variant-filled-primary' : 'variant-ghost-primary'}"
				onclick={() => (inverseVector = !inverseVector)}>Inverse the Vector</button
			>
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
			}}>Continue</button
		>
	</div>
{/if}
