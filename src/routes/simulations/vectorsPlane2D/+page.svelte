<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DResultantCard.svelte';

	import { Plane } from '$lib/components/simulations/maths/vectorsplane/2D/VectorsPlane2D';

	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let plane: Plane;

	let zoom: number = 30;

	type Vector = {
		x: number;
		y: number;
		name: string;
		color: string;
	};

	type Resultant = {
		vectors: Writable<Vector[]>;
		vectorsNames: string[];
		name: string;
		color: string;
		x: number;
		y: number;
	};

	let vectors = writable<Vector[]>([]);
	let resultants = writable<Resultant[]>([]);

	let vectorPopupState = false;
	let popupPostion = writable({ x: 0, y: 0 });

	// This will hold the value of the rv who is gonna get a vector
	let rvName: string;

	onMount(() => {
		let parent = canvas.parentElement;
		if (parent) {
			canvas.width = parent?.clientWidth;
			canvas.height = parent?.clientHeight;
		}

		ctx = canvas.getContext('2d');

		plane = new Plane(canvas, ctx, zoom);

		loop();
		function loop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			plane.drawFullPlane(zoom);

			$vectors.forEach((vector) => {
				plane.drawVector(vector.x, vector.y, vector.color, false);
			});

			requestAnimationFrame(loop);
		}
	});

	function addNewVector() {
		vectors.update((currentVectors) => [
			...currentVectors,
			{ x: 0, y: 0, name: `Vector ${currentVectors.length + 1}`, color: '#000000' }
		]);
	}

	function addNewResultant() {
		resultants.update((currentResultants) => [
			...currentResultants,
			{
				vectors: vectors,
				vectorsNames: [],
				name: `RV ${currentResultants.length + 1}`,
				color: '#000000',
				x: 0,
				y: 0
			}
		]);
	}

	function addVectorToResultant(newRvName: string, x: number, y: number) {
		popupPostion.set({ x: x, y: y });
		rvName = newRvName;
		vectorPopupState = !vectorPopupState;
	}

	function addingVectorToResultant(vectorName: string) {
		resultants.update((currentResultants) => {
			currentResultants.forEach((resultant) => {
				if (resultant.name == rvName) resultant.vectorsNames.push(vectorName);
			});

			return currentResultants;
		});

		vectorPopupState = !vectorPopupState;
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex flex-col xl:flex-row overflow-hidden">
		<div class="flex-1 h-full">
			<canvas bind:this={canvas} class="border-2"></canvas>
		</div>
		<section class="flex-1 h-full flex flex-col border-l-2 relative">
			<!-- This is the vectors section -->
			<div class="w-full flex-[1_1_0] p-10 flex flex-col justify-center">
				<h1 class="h1 flex-1">Vectors</h1>
				<div
					class="w-full flex-[3_1_0] inside-shadow border-2 rounded-container-token flex p-3 gap-3 overflow-x-auto"
				>
					{#each $vectors as vector}
						<VectorsCard
							bind:x={vector.x}
							bind:y={vector.y}
							bind:color={vector.color}
							name={vector.name}
						/>
					{/each}
					<button
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
						on:click={addNewVector}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-[60%]"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>

			<!-- This is the Resultants section -->
			<div class="w-full flex-[1_1_0] p-10 flex flex-col justify-center">
				<h1 class="h1 flex-1">Resultants</h1>
				<div
					class="w-full flex-[3_1_0] border-2 inside-shadow rounded-container-token flex p-3 gap-3 overflow-x-auto"
				>
					{#each $resultants as resultant}
						<ResultantsCard
							{vectors}
							bind:vectorsNames={resultant.vectorsNames}
							name={resultant.name}
							bind:color={resultant.color}
							addVector={addVectorToResultant}
							bind:x={resultant.x}
							bind:y={resultant.y}
						/>
					{/each}
					<button
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
						on:click={addNewResultant}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-[60%]"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>
			</div>

			<!-- This is the planes section -->
			<div class="w-full h-[20%] flex-shrink-0 p-6 flex flex-col">
				<h1 class="h1">Plane</h1>
				<div class="w-full flex-[3_1_0] flex p-3 gap-3 overflow-x-auto">
					<div class="h-3/5 w-auto">
						<label for="zoom-input">Zoom </label>
						<input type="number" name="zoom-input" class="input" bind:value={zoom} min="0" />
					</div>
				</div>
			</div>
		</section>
	</main>
</div>

<!-- This will be used to select which vector to add -->
{#if vectorPopupState}
	<div
		class="absolute w-64 h-auto bg-surface-200-700-token flex flex-col gap-3 p-2 z-50"
		style="top: {$popupPostion.y}px; left: {$popupPostion.x}px"
		transition:slide
	>
		{#each $vectors as vector}
			<button
				class="bg-surface-300-600-token w-full h-[4.5rem] box-content"
				transition:slide
				on:click={() => addingVectorToResultant(vector.name)}
			>
				<div class="w-full p-1 px-5 flex justify-between items-center">
					<h3 class="h5">{vector.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {vector.color};"></div>
				</div>
				<div class="w-full flex items-center justify-around">
					<p>x : {vector.x}</p>
					<p>y : {vector.y}</p>
				</div>
			</button>
		{/each}
	</div>
{/if}

<style>
	.inside-shadow {
		box-shadow: inset 0 0 1rem black;
	}
</style>
