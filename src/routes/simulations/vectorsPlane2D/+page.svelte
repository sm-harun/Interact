<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/2D/2DResultantCard.svelte';

	import { type Vector2d, type Resultant2d } from '$lib/types';

	import { Plane } from '$lib/components/simulations/maths/vectorsplane/2D/VectorsPlane2D';

	import { onDestroy, onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	let modalStore = getModalStore();

	let animationFrameId: number;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let plane: Plane;

	let zoom: number = $state(30);

	let vectors: Vector2d[] = $state([]);
	let resultants: Resultant2d[] = $state([]);

	let vectorPopupState = $state(false);
	let popupPostion = $state({ x: 0, y: 0 });

	type QuadrantModeType =
		| 'Full Plane'
		| 'First Quadrant'
		| 'Second Quadrant'
		| 'Third Quadrant'
		| 'Forth Quadrant';

	let quadrantMode: QuadrantModeType = $state('Full Plane');

	let showGrid = $state(true);
	let showShadows = $state(true);

	// This will hold the value of the rv who is gonna get a vector
	let popupResultantId: string;

	onMount(() => {
		let parent = canvas.parentElement;
		if (parent) {
			canvas.width = parent?.clientWidth;
			canvas.height = parent?.clientHeight;

			// Adds event listener to update the zoom value
			parent.addEventListener('wheel', (event) => {
				if (event.deltaY > 0) {
					zoom -= 1;
				} else if (event.deltaY < 0) {
					zoom += 1;
				}
			});
		}

		ctx = canvas.getContext('2d');

		plane = new Plane(canvas, ctx, zoom);

		plane.drawFloatingVector(4, -3, 2, 6, 'red');

		loop();

		function loop() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (quadrantMode == 'Full Plane') plane.drawFullPlane(zoom, showGrid);
			if (quadrantMode == 'First Quadrant') plane.drawFirstQuadrant(zoom, showGrid);
			if (quadrantMode == 'Second Quadrant') plane.drawSecondQuadrant(zoom, showGrid);
			if (quadrantMode == 'Third Quadrant') plane.drawThirdQuadrant(zoom, showGrid);
			if (quadrantMode == 'Forth Quadrant') plane.drawFourthQuadrant(zoom, showGrid);

			vectors.forEach((vector) => {
				plane.drawVector(vector.x, vector.y, vector.color, false);
			});

			// This adds up all the vectors, scalars and unit vectors in the resultant
			resultants.forEach((resultant) => {
				let { x, y, sumVectors } = calcResultantVector(resultant);

				// Draws all the vectors that make up the resultant in chains
				if (showShadows && resultant.showShadow) {
					// This will be used to draw the sum vectors in chains
					let sumX: number = 0;
					let sumY: number = 0;

					sumVectors.forEach((sum) => {
						plane.drawFloatingVector(sumX, sumY, sum.x, sum.y, sum.color);

						sumX += sum.x;
						sumY += sum.y;
					});
				}

				plane.drawVector(x, y, resultant.color, false);
			});

			animationFrameId = requestAnimationFrame(loop);
		}
	});

	// This adds up all the vectors, scalars and unit vectors in the resultant
	function calcResultantVector(resultant: Resultant2d): {
		x: number;
		y: number;
		sumVectors: { x: number; y: number; color: string }[];
	} {
		let x: number = 0;
		let y: number = 0;

		// We will return this to draw the shadows of the vector if nesseccary
		let sumVectors: { x: number; y: number; color: string }[] = [];

		// Adds up all vectors
		getVectorsFromNames(resultant.vectors).forEach((vector) => {
			x += vector.x;
			y += vector.y;

			sumVectors.push({ x: vector.x, y: vector.y, color: vector.color });
		});

		// Adds up all unit vectors
		resultant.unitVectors.forEach((unitVector: number) => {
			if (unitVector == 0) {
				x += 1;
				sumVectors.push({ x: 1, y: 0, color: 'red' });
			}
			if (unitVector == 1) {
				y += 1;
				sumVectors.push({ x: 0, y: 1, color: 'green' });
			}
		});

		// Adds up all other resultants
		let res = getAllResultants(resultant.resultants);
		res.forEach((value) => {
			x += value.x;
			y += value.y;

			// This will collect every vector from this single res to multiply them with it's own scalar
			let newValues: { x: number; y: number; color: string }[] = [];

			// Pushes every vector and resultant found in the resultant and multiplies them by their scalar
			getVectorsFromNames(value.vecs).forEach((vec) => {
				newValues.push({ x: vec.x, y: vec.y, color: vec.color });
			});
			value.unitVectors.forEach((vec) => {
				if (vec == 0) newValues.push({ x: 1, y: 0, color: 'red' });
				if (vec == 1) newValues.push({ x: 0, y: 1, color: 'green' });
			});
			value.scalars.forEach((scalar) => {
				newValues.forEach((val) => {
					val.x *= scalar;
					val.y *= scalar;
				});
			});

			// Pushes every value to the main array
			newValues.forEach((val) => {
				sumVectors.push(val);
			});
		});

		// Adds up all scalars
		resultant.scalars.forEach((scalar: number) => {
			x *= scalar;
			y *= scalar;

			sumVectors.forEach((sum) => {
				sum.x *= scalar;
				sum.y *= scalar;
			});
		});

		return { x, y, sumVectors };
	}

	// This returns the sum of all the resultants, colors and names, given an array of their names
	function getAllResultants(resNames: string[]): {
		name: string;
		x: number;
		y: number;
		color: string;
		unitVectors: number[];
		scalars: number[];
		vecs: string[];
	}[] {
		let filteredRes = resultants.filter((res) => resNames.includes(res.name));

		let finalArr: {
			name: string;
			x: number;
			y: number;
			color: string;
			unitVectors: number[];
			scalars: number[];
			vecs: string[];
		}[] = [];

		filteredRes.forEach((res) => {
			finalArr.push({
				name: res.name,
				x: calcResultantVector(res).x,
				y: calcResultantVector(res).y,
				color: res.color,
				unitVectors: res.unitVectors,
				scalars: res.scalars,
				vecs: res.vectors
			});
		});

		return finalArr;
	}

	function addNewVector() {
		vectors.push({
			x: 0,
			y: 0,
			name: `${createVectorsId()}`,
			color: '#FFAA00'
		});
	}

	// This creates a unique but predictable id's for the vectors
	function createVectorsId() {
		if (vectors.length == 0) return 1;
		return parseInt(vectors[vectors.length - 1].name) + 1;
	}

	function deleteVector(name: string) {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: `Are you sure you want to delete ${name}`,
			response: (r: string) => {
				if (!r) return;

				vectors.forEach((vector, index) => {
					if (vector.name == name) {
						vectors.splice(index, 1);
					}
				});
			}
		};

		modalStore.trigger(modalSettings);
	}

	function addNewResultant() {
		resultants.push({
			vectors: [],
			scalars: [],
			unitVectors: [],
			resultants: [],
			name: `${createResId()}`,
			color: '#FF00FF',
			showShadow: true
		});
	}

	// This creates a unique but predictable id's for the resultants
	function createResId() {
		if (resultants.length == 0) return 1;
		return parseInt(resultants[resultants.length - 1].name) + 1;
	}

	function deleteResultant(name: string) {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: `Are you sure you want to delete ${name}`,
			response: (r: string) => {
				if (!r) return;

				resultants.forEach((res, index) => {
					if (res.name == name) {
						resultants.splice(index, 1);
					}
				});
			}
		};

		modalStore.trigger(modalSettings);
	}

	function toggleResShadows(name: string) {
		resultants.forEach((res) => {
			if (res.name == name) res.showShadow = !res.showShadow;
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

	function changeQuadrantMode(mode: QuadrantModeType) {
		quadrantMode = mode;
	}

	function toggleGrid() {
		showGrid = !showGrid;
	}

	function toggleShadows() {
		showShadows = !showShadows;
	}

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId);
	});
</script>

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex flex-col xl:flex-row overflow-hidden relative">
		<div class="flex-1 flex-shrink-0 border-2 border-primary-500">
			<canvas bind:this={canvas}></canvas>
		</div>
		<div class="absolute top-0 left-0">
			<button
				class="btn text-lg {quadrantMode == 'Full Plane'
					? 'variant-glass-primary'
					: ''} rounded-none w-full"
				onclick={() => changeQuadrantMode('Full Plane')}>Full Plane</button
			>
			<hr class="!border-dotted !border-primary-500 mx-auto" />
			<button
				class="btn text-lg {quadrantMode == 'First Quadrant'
					? 'variant-glass-primary'
					: ''} rounded-none w-full"
				onclick={() => changeQuadrantMode('First Quadrant')}>1<sup>st</sup> Quardrant</button
			>
			<hr class="!border-dotted !border-primary-500 mx-auto" />
			<button
				class="btn text-lg {quadrantMode == 'Second Quadrant'
					? 'variant-glass-primary'
					: ''} rounded-none w-full"
				onclick={() => changeQuadrantMode('Second Quadrant')}>2<sup>st</sup> Quardrant</button
			>
			<hr class="!border-dotted !border-primary-500 mx-auto" />
			<button
				class="btn text-lg {quadrantMode == 'Third Quadrant'
					? 'variant-glass-primary'
					: ''} rounded-none w-full"
				onclick={() => changeQuadrantMode('Third Quadrant')}>3<sup>st</sup> Quardrant</button
			>
			<hr class="!border-dotted !border-primary-500 mx-auto" />
			<button
				class="btn text-lg {quadrantMode == 'Forth Quadrant'
					? 'variant-glass-primary'
					: ''} rounded-none w-full"
				onclick={() => changeQuadrantMode('Forth Quadrant')}>4<sup>st</sup> Quardrant</button
			>
			<hr class="!border-dotted !border-primary-500 mx-auto" />
		</div>
		<section
			class="flex-1 relative overflow-y-auto bg-gradient-to-tl from-primary-900 via-surface-100 dark:via-surface-800 to-surface-50 dark:to-surface-900"
		>
			<!-- This is the vectors section -->
			<div class="w-full h-auto p-8">
				<h1 class="h1 pb-5">Vectors</h1>
				<div
					class="w-full inside-shadow border-2 border-primary-500-400-token bg-surface-100-800-token rounded-container-token flex p-3 gap-3 overflow-x-auto"
				>
					{#each vectors as vector, i}
						<VectorsCard
							bind:x={vectors[i].x}
							bind:y={vectors[i].y}
							bind:color={vectors[i].color}
							name={vector.name}
							{deleteVector}
						/>
					{/each}
					<button
						aria-label="Close"
						class="card-hover flex-shrink-0 size-52 xl:size-72 rounded-container-token bg-surface-200-700-token grid place-items-center"
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
			<div class="w-full h-auto p-8 justify-center">
				<h1 class="h1 pb-5">Resultants</h1>
				<div
					class="w-full h-auto border-2 border-primary-500-400-token bg-surface-100-800-token inside-shadow rounded-container-token flex p-3 gap-3 overflow-x-auto"
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
							bind:showShadow={resultant.showShadow}
							toggleShadow={toggleResShadows}
							deleteRes={deleteResultant}
						/>
					{/each}
					<button
						aria-label="show popup"
						class="card-hover size-52 xl:size-72 flex-shrink-0 rounded-container-token bg-surface-200-700-token grid place-items-center"
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
			<div class="w-full h-auto flex-shrink-0 p-6 flex flex-col">
				<h1 class="h1">Plane</h1>
				<div class="w-full flex-[3_1_0] p-3 gap-3 flex items-center">
					<!-- This will hold buttons in a grid -->
					<div class="flex-grow pt-3 flex gap-5 items-center">
						<button
							class="btn {showGrid ? 'variant-filled-primary' : 'variant-ghost-primary'}"
							onclick={toggleGrid}>Show Grid</button
						>
						<button
							class="btn {showShadows ? 'variant-filled-primary' : 'variant-ghost-primary'}"
							onclick={toggleShadows}>Disable Shadows</button
						>
					</div>
					<div class="flex-shrink-0 flex flex-col gap-2 items-center">
						<p class="text-2xl font-heading-token font-bold">Zoom</p>
						<input
							type="number"
							name="zoom-input"
							class="input"
							bind:value={zoom}
							min="0"
							step="1"
						/>
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
					<h3 class="h5">Vector {vector.name}</h3>
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
						<h3 class="h5">RV {resultant.name}</h3>
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
