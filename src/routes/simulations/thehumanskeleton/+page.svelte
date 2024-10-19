<script lang="ts">
	import { onMount } from 'svelte';
	import * as Three from 'three';

	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	onMount(() => {
		const scene = new Three.Scene();
		const camera = new Three.PerspectiveCamera(
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

		const light1 = new Three.DirectionalLight(0xffffff, 4);
		light1.position.set(1, 1, 1).normalize();

		const light2 = new Three.AmbientLight(0xffffff, 2);
		light2.position.set(-1, -1, -1).normalize();

		scene.add(light1, light2);

		camera.position.set(-0.03, 2.04, 5.72);

		// Instantiate the GLTFLoader
		const loader = new GLTFLoader();

		// Load the glTF model
		loader.load(
			'/assets/3D-models/human_skeleton.glb',
			(glb) => {
				let obj = glb.scene;
				obj.scale.set(5, 5, 5);
				obj.position.set(0, -5, 0);
				scene.add(obj);
			},
			undefined,
			(error) => {
				console.error('An error occurred while loading the glTF model', error);
			}
		);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.screenSpacePanning = true;
		controls.panSpeed = 1.0; // Adjust the pan speed if needed

		controls.minDistance = 1;
		controls.maxDistance = 10;

		function loop() {
			controls.update();

			renderer.render(scene, camera);
			requestAnimationFrame(loop);
		}

		loop();
	});
</script>

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex flex-col xl:flex-row">
		<div class="flex-[2_1_0]" bind:this={container}>
			<canvas bind:this={canvas} id="main-canvas"></canvas>
		</div>
		<div class="flex-1 bg-surface-200-700-token p-10">
			<h1 class="h1">The Human Skeleton</h1>
			<p class="mt-10">Well yeah this is the Human Skeleton</p>
		</div>
	</main>
</div>
