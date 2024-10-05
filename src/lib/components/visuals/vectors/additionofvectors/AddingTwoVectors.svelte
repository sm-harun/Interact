<script lang="ts">
	import type { Section } from '$lib/stores/courses';
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Plane } from '../coordinatePlane';
	import VectorScales from '../multiplyingvectorsbyscalars/VectorScales.svelte';

	export let section: Section;
	export let showNextSection: () => void;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let plane: Plane;

	let greenVector = { x: 0, y: 0 };
	let redVector = { x: 0, y: 0 };

	// A variable to check shadow state for resultant vector
	let showShadow = true;

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
</script>

<div
	class="w-full xl:aspect-video flex flex-col xl:flex-row relative transition {showNextSection()}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	<section class="h-[30rem] xl:h-auto xl:flex-[2_1_0]">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section
		class="flex-1 h-full p-10 bg-surface-300-600-token flex lg:flex-col flex-wrap gap-4 lg:gap-0"
	>
		<h1 class="h4 pb-10">Make the resultant Vector ( 15, 9 )!</h1>
		<div class="w-full flex-1">
			<h3 class="h3 ml-3 mb-3 text-green-500">Green Vector</h3>
			<div class="w-48 flex gap-2">
				<span>X </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="0"
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
					min="0"
					max="10"
					step={0.1}
					bind:value={greenVector.y}
				/>
				<p>{greenVector.y}</p>
			</div>
		</div>
		<div class="w-full flex-1">
			<h3 class="h3 ml-3 mb-3 text-red-500">Red Vector</h3>
			<div class="w-48 flex gap-2">
				<span>X </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="0"
					max="10"
					step={0.1}
					bind:value={redVector.x}
				/>
				<p>{redVector.x}</p>
			</div>
			<div class="w-48 flex gap-2 mt-3">
				<span>Y </span>
				<input
					class="flex-shrink-0"
					type="range"
					min="0"
					max="10"
					step={0.1}
					bind:value={redVector.y}
				/>
				<p>{redVector.y}</p>
			</div>
		</div>
		<div class="flex-1 flex items-center gap-2">
			<button
				class="btn {showShadow ? 'variant-filled-primary' : 'variant-ghost-primary'}"
				on:click={() => (showShadow = !showShadow)}>Show Shadow</button
			>
		</div>
	</section>
</div>
