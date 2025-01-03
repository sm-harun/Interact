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

	type QuadrantModeType =
		| 'Full Plane'
		| 'First Quadrant'
		| 'Second Quadrant'
		| 'Third Quadrant'
		| 'Forth Quadrant';

	let quadrantMode: QuadrantModeType = $state('Full Plane');

	let vectorPopupState = $state(false);
	let popupPostion = $state({ x: 0, y: 0 });
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

	// This updates vectors x, y, and z when you change the magnitude and direction
	$effect(() => {
		vectors.forEach((vector) => {
			if (vector.inputMode == 'Magnitude mode') {
				vector.x = parseFloat(
					(vector.magnitude * Math.cos((vector.dir * Math.PI) / 180)).toFixed(2)
				);
				vector.y = parseFloat(
					(vector.magnitude * Math.sin((vector.dir * Math.PI) / 180)).toFixed(2)
				);
			}
		});
	});

	// This updates the magnitude and direction when changing x, y, and z
	$effect(() => {
		vectors.forEach((vector) => {
			if (vector.inputMode == 'XYZ mode') {
				vector.magnitude = parseFloat(
					Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)).toFixed(2)
				);
				vector.dir = parseFloat(((Math.atan2(vector.y, vector.x) * 180) / Math.PI).toFixed(2));
			}
		});
	});

	function downlaodCanvasImage() {
		const dataURL = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataURL;
		link.download = 'canvas_image.png';
		link.click();
	}

	function changeInputMode(name: string) {
		vectors.forEach((vector) => {
			if (vector.name == name) {
				if (vector.inputMode === 'XYZ mode') vector.inputMode = 'Magnitude mode';
				else if (vector.inputMode === 'Magnitude mode') vector.inputMode = 'XYZ mode';
			}
		});
	}

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

		// Makes sure they will be a 2 decimal digit numbers
		let finalX = parseFloat(x.toFixed(2));
		let finalY = parseFloat(y.toFixed(2));

		return { x: finalX, y: finalY, sumVectors };
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
			magnitude: 0,
			dir: 0,
			inputMode: 'XYZ mode',
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

<div class="flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="relative flex flex-grow flex-col overflow-hidden xl:flex-row">
		<div class="relative h-full flex-1 flex-shrink-0 border-2 border-primary-500">
			<div class="h-full">
				<canvas bind:this={canvas}></canvas>
			</div>
			<button
				class="btn-icon absolute left-0 top-0"
				onclick={downlaodCanvasImage}
				aria-label="download canvas image"
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
					/>
				</svg>
			</button>
			<div class="absolute right-0 top-0 flex xl:flex-col">
				<button
					class="btn text-sm xl:text-lg {quadrantMode == 'Full Plane'
						? 'variant-glass-primary'
						: ''} w-full rounded-none"
					onclick={() => changeQuadrantMode('Full Plane')}>Full Plane</button
				>
				<button
					class="btn text-sm xl:text-lg {quadrantMode == 'First Quadrant'
						? 'variant-glass-primary'
						: ''} w-full rounded-none"
					onclick={() => changeQuadrantMode('First Quadrant')}
					>1<sup>st</sup> <span class="hidden xl:inline">Quardrant</span></button
				>
				<button
					class="btn text-sm xl:text-lg {quadrantMode == 'Second Quadrant'
						? 'variant-glass-primary'
						: ''} w-full rounded-none"
					onclick={() => changeQuadrantMode('Second Quadrant')}
					>2<sup>st</sup> <span class="hidden xl:inline">Quardrant</span></button
				>
				<button
					class="btn text-sm xl:text-lg {quadrantMode == 'Third Quadrant'
						? 'variant-glass-primary'
						: ''} w-full rounded-none"
					onclick={() => changeQuadrantMode('Third Quadrant')}
					>3<sup>st</sup> <span class="hidden xl:inline">Quardrant</span></button
				>
				<button
					class="btn text-sm xl:text-lg {quadrantMode == 'Forth Quadrant'
						? 'variant-glass-primary'
						: ''} w-full rounded-none"
					onclick={() => changeQuadrantMode('Forth Quadrant')}
					>4<sup>st</sup> <span class="hidden xl:inline">Quardrant</span></button
				>
			</div>
		</div>
		<section
			class="relative flex-1 overflow-y-auto bg-gradient-to-tl from-primary-900 via-surface-100 to-surface-50 dark:via-surface-800 dark:to-surface-900"
		>
			<!-- This is the vectors section -->
			<div class="h-auto w-full p-8">
				<h1 class="h1 pb-5">Vectors</h1>
				<div
					class="inside-shadow bg-surface-100-800-token border-primary-500-400-token flex w-full gap-3 overflow-x-auto border-2 p-3 rounded-container-token"
				>
					{#each vectors as vector, i}
						<VectorsCard
							bind:x={vectors[i].x}
							bind:y={vectors[i].y}
							bind:magnitude={vectors[i].magnitude}
							bind:direction={vectors[i].dir}
							bind:color={vectors[i].color}
							name={vector.name}
							{deleteVector}
							bind:inputMode={vectors[i].inputMode}
							{changeInputMode}
						/>
					{/each}
					<button
						aria-label="Close"
						class="bg-surface-200-700-token card-hover grid size-52 flex-shrink-0 place-items-center rounded-container-token xl:size-72"
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
			<div class="h-auto w-full justify-center p-8">
				<h1 class="h1 pb-5">Resultants</h1>
				<div
					class="inside-shadow bg-surface-100-800-token border-primary-500-400-token flex h-auto w-full gap-3 overflow-x-auto border-2 p-3 rounded-container-token"
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
						class="bg-surface-200-700-token card-hover grid size-52 flex-shrink-0 place-items-center rounded-container-token xl:size-72"
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
			<div class="flex h-auto w-full flex-shrink-0 flex-col p-6">
				<h1 class="h1">Plane</h1>
				<div class="flex w-full flex-[3_1_0] flex-col items-center gap-8 p-3 xl:flex-row xl:gap-3">
					<!-- This will hold buttons in a grid -->
					<div class="flex flex-grow items-center gap-5 pt-3">
						<button
							class="btn {showGrid ? 'variant-filled-primary' : 'variant-ghost-primary'}"
							onclick={toggleGrid}>Show Grid</button
						>
						<button
							class="btn {showShadows ? 'variant-filled-primary' : 'variant-ghost-primary'}"
							onclick={toggleShadows}>Disable Shadows</button
						>
					</div>
					<div class="flex flex-shrink-0 flex-col items-center gap-2">
						<p class="text-2xl font-bold font-heading-token">Zoom</p>
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
		class="bg-surface-200-700-token absolute z-50 grid max-h-56 w-64 grid-cols-1 gap-3 overflow-y-auto p-2 rounded-container-token"
		style="top: {popupPostion.y}px; left: {popupPostion.x}px"
		transition:slide
	>
		<button
			class="bg-surface-300-600-token box-content h-[4.5rem] w-full rounded-container-token"
			onclick={addScalarToResultant}>Scaler</button
		>
		<div
			class="bg-surface-200-700-token box-content grid h-[4.5rem] w-full grid-cols-2 gap-3 rounded-container-token"
		>
			<button
				class="bg-surface-300-600-token box-content size-full rounded-container-token"
				onclick={() => addUnitVectorToResultant(0)}>i</button
			>
			<button
				class="bg-surface-300-600-token box-content size-full rounded-container-token"
				onclick={() => addUnitVectorToResultant(1)}>j</button
			>
		</div>
		{#each vectors as vector}
			<button
				class="bg-surface-300-600-token box-content h-[4.5rem] w-full rounded-container-token"
				transition:slide
				onclick={() => addVectorToResultant(vector.name)}
			>
				<div class="flex w-full items-center justify-between p-1 px-5">
					<h3 class="h5">Vector {vector.name}</h3>
					<div class="size-6 rounded-full" style="background-color: {vector.color};"></div>
				</div>
				<div class="flex w-full items-center justify-around">
					<p>x : {vector.x}</p>
					<p>y : {vector.y}</p>
				</div>
			</button>
		{/each}
		{#each resultants as resultant}
			<!-- This makes sure we don't add a resultant to it's self -->
			{#if popupResultantId !== resultant.name}
				<button
					class="bg-surface-300-600-token box-content h-[4.5rem] w-full rounded-container-token"
					transition:slide
					onclick={() => addResultantToResultant(resultant.name)}
				>
					<div class="flex w-full items-center justify-between p-1 px-5">
						<h3 class="h5">RV {resultant.name}</h3>
						<div class="size-6 rounded-full" style="background-color: {resultant.color};"></div>
					</div>
					<div class="flex w-full items-center justify-around">
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
