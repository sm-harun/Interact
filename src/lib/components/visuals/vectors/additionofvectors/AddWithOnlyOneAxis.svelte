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

	let greenVector = { x: 0, y: 0 };
	let redVector = { x: 0, y: 0 };

	// A variable to check shadow state for resultant vector
	let showShadow = true;

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
		plane.drawRedVector(true);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(true);

		plane.drawSumVector(
			greenVector.x,
			greenVector.y,
			redVector.x,
			redVector.y,
			'grey',
			showShadow,
			'green',
			'red'
		);

		plane.updateGreenVector(greenVector.x, greenVector.y, true);
		plane.updateRedVector(redVector.x, redVector.y, true);

		requestAnimationFrame(loop);
	}

	function checkAnswer() {
		if (greenVector.x == 7 && redVector.y == 14) {
			explained = true;
			wrongAnswer = false;

			showNextSection();
		} else {
			wrongAnswer = true;
		}
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
		<canvas bind:this={canvas}></canvas>
	</section>
	<section
		class="flex-1 h-full p-10 bg-surface-300-600-token flex sm:flex-col flex-wrap gap-4 lg:gap-0"
	>
		<h1 class="h4 pb-10">
			Draw the Vector ( 7, 14 ) using only the x-axis from the green vector and y-axis from the red
			vector!
		</h1>
		<div class="w-full flex-1 flex flex-col justify-center">
			<h3 class="h3 ml-3 mb-3 text-green-500">Green Vector</h3>
			<div class="w-48 flex gap-2">
				<span>X </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="0"
					max="20"
					step={0.1}
					bind:value={greenVector.x}
				/>
				<p>{greenVector.x}</p>
			</div>
		</div>
		<div class="w-full flex-1 flex flex-col justify-center mt-2">
			<h3 class="h3 ml-3 mb-3 text-red-500">Red Vector</h3>
			<div class="w-48 flex gap-2 mt-3">
				<span>Y </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="0"
					max="20"
					step={0.1}
					bind:value={redVector.y}
				/>
				<p>{redVector.y}</p>
			</div>
		</div>
		<div
			class="flex-1 flex flex-col lg:flex-row justify-around lg:justify-between items-start lg:items-end gap-2 mt-5"
		>
			<button
				class="btn {showShadow ? 'variant-filled-primary' : 'variant-ghost-primary'}"
				on:click={() => (showShadow = !showShadow)}>Show Shadow</button
			>
			<button class="btn variant-filled-primary self-end" on:click={checkAnswer}>Submit</button>
		</div>
	</section>
</div>
