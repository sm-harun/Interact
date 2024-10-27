<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DResultantCard.svelte';

	import { type Vector2d, type Resultant2d } from '$lib/types';

	import { Plane } from '$lib/components/simulations/maths/vectorsplane/2D/VectorsPlane2D';

	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let animationFrameId: number;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let plane: Plane;

	let zoom: number = $state(30);

	let vectors: Vector2d[] = $state([]);
	let resultants: Resultant2d[] = $state([]);

	let vectorPopupState = $state(false);
	let popupPostion = $state({ x: 0, y: 0 });

	// This will hold the value of the rv who is gonna get a vector
	let popupResultantId: string;

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

			vectors.forEach((vector) => {
				plane.drawVector(vector.x, vector.y, vector.color, false);
			});

			// This adds up all the vectors, scalars and unit vectors in the resultant
			resultants.forEach((resultant) => {
				let { x, y } = calcResultantVector(resultant);

				plane.drawVector(x, y, resultant.color, false);
			});

			animationFrameId = requestAnimationFrame(loop);
		}
	});

	// This adds up all the vectors, scalars and unit vectors in the resultant
	function calcResultantVector(resultant: Resultant2d): { x: number; y: number } {
		let x: number = 0;
		let y: number = 0;

		// Adds up all vectors
		getVectorsFromNames(resultant.vectors).forEach((vector) => {
			x += vector.x;
			y += vector.y;
		});

		// Adds up all unit vectors
		resultant.unitVectors.forEach((unitVector: number) => {
			if (unitVector == 0) x += 1;
			if (unitVector == 1) y += 1;
		});

		// Adds up all other resultants
		let values = getAllResultants(resultant.resultants);
		values.forEach((value) => {
			x += value.x;
			y += value.y;
		});

		// Adds up all scalars
		resultant.scalars.forEach((scalar: number) => {
			x *= scalar;
			y *= scalar;
		});

		return { x: x, y: y };
	}

	// This returns the sum of all the resultants, colors and names, given an array of their names
	function getAllResultants(
		resNames: string[]
	): { name: string; x: number; y: number; color: string }[] {
		let filteredRes = resultants.filter((res) => resNames.includes(res.name));

		let finalArr: { name: string; x: number; y: number; color: string }[] = [];

		filteredRes.forEach((res) => {
			finalArr.push({
				name: res.name,
				x: calcResultantVector(res).x,
				y: calcResultantVector(res).y,
				color: res.color
			});
		});

		return finalArr;
	}

	function addNewVector() {
		vectors.push({ x: 0, y: 0, name: `Vector ${vectors.length + 1}`, color: '#000000' });
	}

	function addNewResultant() {
		resultants.push({
			vectors: [],
			scalars: [],
			unitVectors: [],
			resultants: [],
			name: `RV ${resultants.length + 1}`,
			color: '#000000'
		});
	}

	// Resturns the actual vectors using the names of the vectors
	function getVectorsFromNames(names: string[]): Vector2d[] {
		return vectors.filter((vector) => names.includes(vector.name));
	}

	function showAddVectorPopup(resultantId: string, x: number, y: number) {
		popupPostion = { x: x, y: y };
		popupResultantId = resultantId;
		vectorPopupState = true;
	}

	// Adds vector to resultant
	function addVectorToResultant(newVector: string) {
		resultants.forEach((resultant) => {
			if (resultant.name == popupResultantId) resultant.vectors.push(newVector);
		});

		vectorPopupState = false;
	}

	// Adds scalar to resultant
	function addScalarToResultant() {
		resultants.forEach((resultant) => {
			if (resultant.name == popupResultantId) resultant.scalars.push(1);
		});

		vectorPopupState = false;
	}

	// Adds unit vector to resultant
	function addUnitVectorToResultant(unitVector: number) {
		resultants.forEach((resultant) => {
			if (resultant.name == popupResultantId) resultant.unitVectors.push(unitVector);
		});

		vectorPopupState = false;
	}

	// Adds resultant to resultant
	function addResultantToResultant(resultantName: string) {
		resultants.forEach((resultant) => {
			if (resultant.name == popupResultantId) resultant.resultants.push(resultantName);
		});

		vectorPopupState = false;
	}

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId);
	});
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
					{#each vectors as vector, i}
						<VectorsCard
							bind:x={vectors[i].x}
							bind:y={vectors[i].y}
							bind:color={vectors[i].color}
							name={vector.name}
						/>
					{/each}
					<button
						aria-label="Close"
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
						onclick={addNewVector}
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
					{#each resultants as resultant}
						<ResultantsCard
							vectors={getVectorsFromNames(resultant.vectors)}
							bind:scalars={resultant.scalars}
							unitVectors={resultant.unitVectors}
							resultants={getAllResultants(resultant.resultants)}
							name={resultant.name}
							bind:color={resultant.color}
							showPopup={showAddVectorPopup}
						/>
					{/each}
					<button
						aria-label="show popup"
						class="card-hover h-full aspect-square rounded-container-token bg-surface-200-700-token grid place-items-center"
						onclick={addNewResultant}
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
		class="absolute w-64 max-h-56 bg-surface-200-700-token grid grid-cols-1 gap-3 p-2 z-50 overflow-y-auto rounded-container-token"
		style="top: {popupPostion.y}px; left: {popupPostion.x}px"
		transition:slide
	>
		<button
			class="bg-surface-300-600-token w-full h-[4.5rem] box-content rounded-container-token"
			onclick={addScalarToResultant}>Scaler</button
		>
		<div
			class="bg-surface-200-700-token w-full h-[4.5rem] box-content rounded-container-token grid grid-cols-2 gap-3"
		>
			<button
				class="bg-surface-300-600-token size-full box-content rounded-container-token"
				onclick={() => addUnitVectorToResultant(0)}>i</button
			>
			<button
				class="bg-surface-300-600-token size-full box-content rounded-container-token"
				onclick={() => addUnitVectorToResultant(1)}>j</button
			>
		</div>
		{#each vectors as vector}
			<button
				class="bg-surface-300-600-token w-full h-[4.5rem] box-content rounded-container-token"
				transition:slide
				onclick={() => addVectorToResultant(vector.name)}
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
		{#each resultants as resultant}
			<!-- This makes sure we don't add a resultant to it's self -->
			{#if popupResultantId !== resultant.name}
				<button
					class="bg-surface-300-600-token w-full h-[4.5rem] box-content rounded-container-token"
					transition:slide
					onclick={() => addResultantToResultant(resultant.name)}
				>
					<div class="w-full p-1 px-5 flex justify-between items-center">
						<h3 class="h5">{resultant.name}</h3>
						<div class="size-6 rounded-full" style="background-color: {resultant.color};"></div>
					</div>
					<div class="w-full flex items-center justify-around">
						<p>x : {calcResultantVector(resultant).x}</p>
						<p>y : {calcResultantVector(resultant).y}</p>
					</div>
				</button>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.inside-shadow {
		box-shadow: inset 0 0 1rem black;
	}
</style>
