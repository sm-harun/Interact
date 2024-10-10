<script lang="ts">
	import type { Section } from '$lib/stores/courses';
	import { fly, slide, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';

	export let section: Section;
	export let showNextSection: () => void;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let plane: Plane;

	let showButton = true;

	let greenVector = { x: 0, y: 0 };

	// A variable to check shadow state for resultant vector
	let inverseVector = false;

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
	class="w-full xl:aspect-video flex flex-col xl:flex-row relative transition border-2 {explained
		? 'border-success-500'
		: wrongAnswer
			? 'border-error-500'
			: 'border-transparent'}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	{#if wrongAnswer}
		<p class="text-xl text-error-500 absolute top-3 right-5" transition:fade>incorrect</p>
	{/if}
	<section class="h-[30rem] xl:h-auto xl:flex-[2_1_0]">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section
		class="flex-1 h-full p-10 bg-surface-300-600-token flex sm:flex-col flex-wrap gap-4 lg:gap-0"
	>
		<h1 class="h4 pb-10">Play around with the vector and See the effects when it is inversed</h1>
		<div class="w-full flex-1 flex flex-col justify-center gap-5">
			{#if inverseVector}
				<p class="text-3xl font-bold mb-5">V = ({-greenVector.x}, {-greenVector.y})</p>
			{:else}
				<p class="text-3xl font-bold mb-5">V = ({greenVector.x}, {greenVector.y})</p>
			{/if}
			<div class="w-48 flex gap-2">
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
			<div class="w-48 flex gap-2 mt-3">
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
				on:click={() => (inverseVector = !inverseVector)}>Inverse the Vector</button
			>
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
			}}>Continue</button
		>
	</div>
{/if}
