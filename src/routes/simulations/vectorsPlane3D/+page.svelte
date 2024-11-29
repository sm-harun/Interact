<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { slide } from 'svelte/transition';

	import * as Three from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	import { onDestroy, onMount } from 'svelte';

	import { type Vector3d, type Resultant3d } from '$lib/types';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DResultantCard.svelte';
	import { derived } from 'svelte/store';

	let modalStore = getModalStore();

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	let animationFrameId: number;

	let scene: any;
	let camera: any;
	let controls: any;
	let gridHelper: any;

	let popupPostion = $state({ x: 0, y: 0 });
	let popupResultantId: string | undefined = $state();
	let vectorPopupState = $state(false);

	let zoom: number = $state(100);

	let vectors: Vector3d[] = $state([]);
	let resultants: Resultant3d[] = $state([]);

	let vecArray: any[] = [];
	let resArray: any[] = [];

	let showGrid = $state(true);

	onMount(() => {
		let parent = canvas.parentElement;

		if (parent) {
			canvas.width = parent?.clientWidth;
			canvas.height = parent?.clientHeight;
		}

		scene = new Three.Scene();
		camera = new Three.PerspectiveCamera(
			75,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		const renderer = new Three.WebGLRenderer({
			canvas: canvas
		});

		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(container.clientWidth / container.clientHeight);
		renderer.setSize(container.clientWidth, container.clientHeight);

		camera.position.x = 10;
		camera.position.y = 10;
		camera.position.z = 10;

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.screenSpacePanning = false;
		controls.panSpeed = 1.0; // Adjust the pan speed if needed

		controls.minDistance = 1;

		// Creates the 3 axis
		const axesHelper = new Three.AxesHelper(zoom / 2);
		scene.add(axesHelper);

		// Creates a 2D grid
		gridHelper = new Three.GridHelper(zoom, zoom);
		scene.add(gridHelper);

		vectors.forEach((vector) => {
			const direction = new Three.Vector3(vector.x, vector.y, vector.z).normalize();
			const arrowHelper = new Three.ArrowHelper(
				direction,
				new Three.Vector3(0, 0, 0),
				1,
				vector.color
			);

			vecArray.push();

			scene.add(arrowHelper);
		});

		function loop() {
			controls.update();
			animationFrameId = requestAnimationFrame(loop);

			vectors.forEach((vector, i) => {
				let newVector = new Three.Vector3(vector.x, vector.y, vector.z);
				vecArray[i].setDirection(newVector.clone().normalize());
				vecArray[i].setLength(newVector.length());
				vecArray[i].setColor(vector.color);
			});

			resultants.forEach((resultant, i) => {
				let { x, y, z, sumVectors } = calcResultantVector(resultant);

				// 	TODO add shadow functionality to 3D vectors
				// sumVectors.forEach((sum) => {
				// });

				let newRes = new Three.Vector3(x, y, z);
				resArray[i].setDirection(newRes.clone().normalize());
				resArray[i].setLength(newRes.length());
				resArray[i].setColor(resultant.color);
			});

			renderer.render(scene, camera);
		}
		loop();
	});

	function downlaodCanvasImage() {
		const dataURL = canvas.toDataURL('image/png');
		const link = document.createElement('a');
		link.href = dataURL;
		link.download = 'canvas_image.png';
		link.click();
	}

	function updateGrid() {
		scene.remove(gridHelper);
		gridHelper = new Three.GridHelper(zoom, zoom);
		scene.add(gridHelper);
	}

	function toggleGrid() {
		if (showGrid) {
			scene.remove(gridHelper);
			showGrid = false;
		} else {
			scene.add(gridHelper);
			showGrid = true;
		}
	}

	function getAllResultants(resNames: string[]) {
		let filteredRes = resultants.filter((res) => resNames.includes(res.name));

		let finalArr: {
			name: string;
			x: number;
			y: number;
			z: number;
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
				z: calcResultantVector(res).z,
				color: res.color,
				unitVectors: res.unitVectors,
				scalars: res.scalars,
				vecs: res.vectors
			});
		});

		return finalArr;
	}

	function calcResultantVector(resultant: Resultant3d): {
		x: number;
		y: number;
		z: number;
		sumVectors: { x: number; y: number; z: number; color: string }[];
	} {
		let x: number = 0;
		let y: number = 0;
		let z: number = 0;

		let sumVectors: { x: number; y: number; z: number; color: string }[] = [];

		// Adds up all vectors
		getVectorsFromNames(resultant.vectors).forEach((vector) => {
			x += vector.x;
			y += vector.y;
			z += vector.z;

			sumVectors.push({ x: vector.x, y: vector.y, z: vector.z, color: vector.color });
		});

		// Adds up all unit vectors
		resultant.unitVectors.forEach((unitVector: number) => {
			if (unitVector == 0) {
				x += 1;
				sumVectors.push({ x: 1, y: 0, z: 0, color: 'red' });
			}
			if (unitVector == 1) {
				y += 1;
				sumVectors.push({ x: 0, y: 1, z: 0, color: 'green' });
			}
			if (unitVector == 2) {
				z += 1;
				sumVectors.push({ x: 0, y: 0, z: 1, color: 'blue' });
			}
		});

		// Adds up all other resultants
		let res = getAllResultants(resultant.resultants);
		res.forEach((value) => {
			x += value.x;
			y += value.y;
			z += value.z;
		});

		// Adds up all scalars
		resultant.scalars.forEach((scalar: number) => {
			x *= scalar;
			y *= scalar;
			z *= scalar;

			sumVectors.forEach((sum) => {
				sum.x *= scalar;
				sum.y *= scalar;
				sum.z *= scalar;
			});
		});

		return { x, y, z, sumVectors };
	}

	function addNewVector() {
		vectors.push({ x: 0, y: 0, z: 0, name: `${createVectorId()}`, color: '#FFAA00' });

		let newVector = new Three.ArrowHelper(
			new Three.Vector3(0, 0, 0),
			new Three.Vector3(0, 0, 0),
			1,
			'#FFAA00'
		);

		vecArray.push(newVector);
		scene.add(newVector);
	}

	// This creates a unique but predictable id's for the vectors
	function createVectorId() {
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

						// Removes the vector from the scene and array
						scene.remove(vecArray[index]);
						vecArray.splice(index, 1);
					}
				});
			}
		};

		modalStore.trigger(modalSettings);
	}

	// This creates a unique but predictable id's for the resultants
	function createResId() {
		if (resultants.length == 0) return 1;
		return parseInt(resultants[resultants.length - 1].name) + 1;
	}

	function addNewResultant() {
		resultants.push({
			vectors: [],
			scalars: [],
			unitVectors: [],
			resultants: [],
			name: `${createResId()}`,
			color: '#FF00FF'
		});

		let newRes = new Three.ArrowHelper(
			new Three.Vector3(0, 0, 0),
			new Three.Vector3(0, 0, 0),
			1,
			'#FF00FF'
		);

		resArray.push(newRes);
		scene.add(newRes);
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

						// Removes the vector from the scene and array
						scene.remove(resArray[index]);
						resArray.splice(index, 1);
					}
				});
			}
		};

		modalStore.trigger(modalSettings);
	}

	function getVectorsFromNames(names: string[]) {
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

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<div class="flex-1 h-full overflow-hidden">
		<main class="flex-grow flex flex-col h-full xl:flex-row overflow-hidden">
			<div class="flex-1 h-full flex-shrink-0 border-2 border-primary-500 relative">
				<div bind:this={container} class="flex-1 h-full flex-shrink-0 border-2 border-primary-500">
					<canvas bind:this={canvas}></canvas>
				</div>
				<button
					class="absolute top-0 left-0 btn-icon"
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
			</div>
			<section
				class="flex-1 flex-shrink-0 relative overflow-y-auto bg-gradient-to-tl from-primary-900 via-surface-100 dark:via-surface-800 to-surface-50 dark:to-surface-900"
			>
				<!-- This is the vectors section -->
				<div class="w-full p-8 overflow-hidden">
					<h1 class="h1 pb-5">Vectors</h1>
					<div
						class="w-full inside-shadow border-2 border-primary-500-400-token bg-surface-100-800-token rounded-container-token flex p-3 gap-3 overflow-x-auto"
					>
						{#each vectors as vector, i}
							<VectorsCard
								bind:x={vectors[i].x}
								bind:y={vectors[i].y}
								bind:z={vectors[i].z}
								bind:color={vectors[i].color}
								name={vector.name}
								{deleteVector}
							/>
						{/each}
						<button
							aria-label="Close"
							class="card-hover size-60 xl:size-72 flex-shrink-0 rounded-container-token bg-surface-200-700-token grid place-items-center"
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
				<div class="w-full p-10">
					<h1 class="h1 pb-5">Resultants</h1>
					<div
						class="w-full border-2 border-primary-500-400-token bg-surface-100-800-token inside-shadow rounded-container-token flex p-3 gap-3 overflow-x-auto"
					>
						{#each resultants as resultant}
							<ResultantsCard
								vectors={getVectorsFromNames(resultant.vectors)}
								bind:scalars={resultant.scalars}
								unitVectors={resultant.unitVectors}
								resultants={getAllResultants(resultant.resultants)}
								name={resultant.name}
								bind:color={resultant.color}
								deleteRes={deleteResultant}
								showPopup={showAddVectorPopup}
							/>
						{/each}
						<button
							aria-label="show popup"
							class="card-hover size-60 xl:size-72 flex-shrink-0 rounded-container-token bg-surface-200-700-token grid place-items-center"
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
						</div>
						<div class="flex-shrink-0 flex flex-col gap-2 items-center">
							<p class="text-2xl font-heading-token font-bold">Grid Size</p>
							<input
								type="number"
								name="zoom-input"
								class="input"
								onchange={updateGrid}
								bind:value={zoom}
								min="0"
								step="2"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
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
			class="bg-surface-200-700-token w-full h-[4.5rem] box-content rounded-container-token grid grid-cols-3 gap-3"
		>
			<button
				class="bg-surface-300-600-token size-full box-content rounded-container-token"
				onclick={() => addUnitVectorToResultant(0)}>i</button
			>
			<button
				class="bg-surface-300-600-token size-full box-content rounded-container-token"
				onclick={() => addUnitVectorToResultant(1)}>j</button
			>
			<button
				class="bg-surface-300-600-token size-full box-content rounded-container-token"
				onclick={() => addUnitVectorToResultant(2)}>k</button
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
					<p>z : {vector.z}</p>
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
						<p>z : {calcResultantVector(resultant).z}</p>
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
