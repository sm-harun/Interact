<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Plane from '$lib/components/simulations/maths/vectorsplane/2D/VectorsPlane2D';
	import VectorInputs from './VectorInputs.svelte';
	import { theme } from '$lib/stores/themes';
	import { getCurrentThemeColor } from '$lib/utils';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let animationFrame: number;

	let plane: Plane;

	let firstVector = $state({ x: 10, y: 4, color: 'red' });
	let secVector = $state({ x: 2, y: 8, color: 'green' });
	let resVectorColor = $state('grey');

	// A variable to check shadow state for resultant vector
	let showShadow = $state(false);

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		let parent = canvas.parentElement;

		function resize() {
			if (parent) {
				canvas.width = parent.clientWidth;
				canvas.height = parent.clientHeight;
				plane = new Plane(canvas, ctx, parent?.clientWidth, parent?.clientHeight, 25);
			}
		}
		window.addEventListener('resize', resize);

		resize();

		plane = new Plane(canvas, ctx, parent?.clientWidth, parent?.clientHeight, 25);

		requestAnimationFrame(loop);
	});

	function loop() {
		plane.clear();
		plane.drawFirstQuadrant(19, true, 'rgba(255, 255, 255, 0.2)');

		if (showShadow) {
			plane.drawFloatingVector(
				firstVector.x,
				firstVector.y,
				secVector.x,
				secVector.y,
				getCurrentThemeColor('secondary', '500', '0.3')
			);

			plane.drawFloatingVector(
				secVector.x,
				secVector.y,
				firstVector.x,
				firstVector.y,
				getCurrentThemeColor('primary', '500', '0.3')
			);
		}

		plane.drawVector(firstVector.x + secVector.x, firstVector.y + secVector.y, resVectorColor);

		plane.drawVector(firstVector.x, firstVector.y, firstVector.color);
		plane.drawVector(secVector.x, secVector.y, secVector.color);

		animationFrame = requestAnimationFrame(loop);
	}

	$effect(() => {
		$theme;

		firstVector.color = getCurrentThemeColor('primary', '500');
		secVector.color = getCurrentThemeColor('secondary', '500');

		resVectorColor = getCurrentThemeColor('tertiary', '500');
	});

	onDestroy(() => {
		cancelAnimationFrame(animationFrame);
	});
</script>

<div class="relative aspect-square w-full">
	<section class="size-full">
		<canvas bind:this={canvas}> </canvas>
	</section>
	<section class="absolute left-0 top-0 flex size-full flex-col items-end gap-10 p-6 px-20">
		<div class="flex flex-col justify-center text-primary-500">
			<VectorInputs text="X" bind:value={firstVector.x} colorClass="text-primary-500" />
			<VectorInputs text="Y" bind:value={firstVector.y} colorClass="text-primary-500" />
		</div>
		<div class="mt-2 flex flex-col justify-center text-secondary-500">
			<VectorInputs text="X" bind:value={secVector.x} colorClass="text-secondary-500" />
			<VectorInputs text="Y" bind:value={secVector.y} colorClass="text-secondary-500" />
		</div>
	</section>

	<button
		class="btn-icon absolute bottom-10 right-10 {showShadow
			? 'variant-filled-primary'
			: 'variant-glass-primary'}"
		onclick={() => (showShadow = !showShadow)}
		aria-label="Show vector shadows"
		><svg viewBox="0 0 24 24" class="size-8 fill-white">
			<g id="SVGRepo_iconCarrier">
				<path
					d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
					fill="#1C274C"
				></path> <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#1C274C"></ellipse>
				<path
					opacity="0.5"
					d="M22 19.723V12.3006C22 6.61173 17.5228 2 12 2C6.47715 2 2 6.61173 2 12.3006V19.723C2 21.0453 3.35098 21.9054 4.4992 21.314C5.42726 20.836 6.5328 20.9069 7.39614 21.4998C8.36736 22.1667 9.63264 22.1667 10.6039 21.4998L10.9565 21.2576C11.5884 20.8237 12.4116 20.8237 13.0435 21.2576L13.3961 21.4998C14.3674 22.1667 15.6326 22.1667 16.6039 21.4998C17.4672 20.9069 18.5727 20.836 19.5008 21.314C20.649 21.9054 22 21.0453 22 19.723Z"
					stroke="#1C274C"
					stroke-width="1.5"
				></path>
			</g></svg
		>
	</button>
</div>
