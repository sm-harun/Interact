<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { slide } from 'svelte/transition';

	import * as Three from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	import { onDestroy, onMount } from 'svelte';

	import { type Vector3d, type Resultant3d } from '$lib/types';

	import VectorsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DVectorCard.svelte';
	import ResultantsCard from '$lib/components/simulations/maths/vectorsplane/3D/3DResultantCard.svelte';

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;
	let ctx: CanvasRenderingContext2D;

	let animationFrameId: number;

	let scene: any;
	let camera: any;
	let controls: any;
	let gridHelper: any;

	let popupPostion = $state({ x: 0, y: 0 });
	let popupResultantId: string;
	let vectorPopupState = $state(false);

	let zoom: number = $state(100);

	let vectors: Vector3d[] = $state([]);
	let resultants: Resultant3d[] = $state([]);

	let vecArray: any[] = [];
	let resArray: any[] = [];

	let showGrid = $state(false);

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
		controls.maxDistance = 100;

		// Creates the 3 axis
		const axesHelper = new Three.AxesHelper(zoom);
		scene.add(axesHelper);

		// Creates a 2D grid
		gridHelper = new Three.GridHelper(zoom, zoom);

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
				let { x, y, z } = calcResultantVector(resultant);

				let newRes = new Three.Vector3(x, y, z);
				resArray[i].setDirection(newRes.clone().normalize());
				resArray[i].setLength(newRes.length());
				resArray[i].setColor(resultant.color);
			});

			renderer.render(scene, camera);
		}
		loop();
	});

	function toggleGrid() {
		if (showGrid) {
			scene.remove(gridHelper);
			showGrid = false;
		} else {
			scene.add(gridHelper);
			showGrid = true;
		}
	}

	function calcResultantVector(resultant: Resultant3d) {
		let x: number = 0;
		let y: number = 0;
		let z: number = 0;

		// Adds up all vectors
		getVectorsFromNames(resultant.vectors).forEach((vector) => {
			x += vector.x;
			y += vector.y;
			z += vector.z;
		});

		// Adds up all unit vectors
		resultant.unitVectors.forEach((unitVector: number) => {
			if (unitVector == 0) x += 1;
			if (unitVector == 1) y += 1;
			if (unitVector == 2) z += 1;
		});

		// Adds up all other resultants
		let values = getAllResultants(resultant.resultants);
		values.forEach((value) => {
			x += value.x;
			y += value.y;
			z += value.z;
		});

		// Adds up all scalars
		resultant.scalars.forEach((scalar: number) => {
			x *= scalar;
			y *= scalar;
			z *= scalar;
		});

		return { x: x, y: y, z: z };
	}

	function addNewVector() {
		vectors.push({ x: 0, y: 0, z: 0, name: `Vector ${vectors.length + 1}`, color: '#FFFF00' });

		let newVector = new Three.ArrowHelper(
			new Three.Vector3(0, 0, 0),
			new Three.Vector3(0, 0, 0),
			1,
			'#000000'
		);

		vecArray.push(newVector);
		scene.add(newVector);
	}

	function addNewResultant() {
		resultants.push({
			vectors: [],
			scalars: [],
			unitVectors: [],
			resultants: [],
			name: `RV ${resultants.length + 1}`,
			color: '#FFFF00'
		});

		let newRes = new Three.ArrowHelper(
			new Three.Vector3(0, 0, 0),
			new Three.Vector3(0, 0, 0),
			1,
			'#000000'
		);

		resArray.push(newRes);
		scene.add(newRes);
	}

	function getAllResultants(resNames: string[]) {
		let filteredRes = resultants.filter((res) => resNames.includes(res.name));

		let finalArr: { name: string; x: number; y: number; z: number; color: string }[] = [];

		filteredRes.forEach((res) => {
			finalArr.push({
				name: res.name,
				x: calcResultantVector(res).x,
				y: calcResultantVector(res).y,
				z: calcResultantVector(res).z,
				color: res.color
			});
		});

		return finalArr;
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

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<div class="flex-1 h-full overflow-hidden">
		<main class="flex-grow flex flex-col h-full xl:flex-row overflow-hidden">
			<div bind:this={container} class="flex-1 h-full">
				<canvas bind:this={canvas} class="border-2"></canvas>
			</div>
			<section class="flex-1 h-full flex flex-col border-l-2 relative overflow-y-auto">
				<!-- This is the vectors section -->
				<div class="w-full flex-[1_1_0] p-10 flex flex-col justify-center overflow-hidden">
					<h1 class="h1 flex-1">Vectors</h1>
					<div
						class="w-full flex-[3_1_0] inside-shadow border-2 rounded-container-token flex p-3 gap-3 overflow-x-auto"
					>
						{#each vectors as vector, i}
							<VectorsCard
								bind:x={vectors[i].x}
								bind:y={vectors[i].y}
								bind:z={vectors[i].z}
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
					<div
						class="w-full flex-[3_1_0] flex justify-between items-center p-3 gap-3 overflow-x-auto"
					>
						<div class="h-3/5 w-auto">
							<label for="zoom-input">Zoom </label>
							<input type="number" name="zoom-input" class="input" bind:value={zoom} min="0" />
						</div>
						<div>
							<button
								class="btn {showGrid ? 'variant-filled-primary' : 'variant-ghost-primary'}"
								onclick={toggleGrid}>Show Grid</button
							>
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
