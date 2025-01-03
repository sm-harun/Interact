<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as Three from 'three';

	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { tweened } from 'svelte/motion';

	import gsap from 'gsap';
	import NavBar from './NavBar.svelte';

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;

	let camera: any;
	let controls: any;

	let cameraPos = tweened({ x: -0.03, y: 2.04, z: 5.72 });

	let animationFrameId: number;

	onMount(() => {
		const scene = new Three.Scene();
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

		const light1 = new Three.DirectionalLight(0xffffff, 4);
		light1.position.set(1, 1, 1).normalize();

		const light2 = new Three.AmbientLight(0xffffff, 2);
		light2.position.set(-1, -1, -1).normalize();

		scene.add(light1, light2);

		camera.position.set($cameraPos.x, $cameraPos.y, $cameraPos.z);

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

		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		controls.screenSpacePanning = false;
		controls.panSpeed = 1.0; // Adjust the pan speed if needed

		controls.minDistance = 1;
		controls.maxDistance = 10;

		function loop() {
			controls.update();

			// console.log(camera.position, controls.target);

			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(loop);
		}
		loop();
	});

	const camPos = (x: number, y: number, z: number, xt: number, yt: number, zt: number) => {
		gsap.to(camera.position, {
			x: x,
			y: y,
			z: z,
			duration: 2,
			ease: 'power2.inOut',
			onUpdate: () => {
				camera.lookAt(0, 0, 0); // Ensure the camera continues to look at the target
			}
		});
		gsap.to(controls.target, {
			x: xt,
			y: yt,
			z: zt,
			duration: 2,
			ease: 'power2.inOut',
			onUpdate: () => {
				camera.lookAt(0, 0, 0); // Ensure the camera continues to look at the target
			}
		});
	};

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId);
	});
</script>

<div class="h-screen flex flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="flex-grow flex flex-col xl:flex-row overflow-hidden absolute size-full">
		<div class="flex-[2_1_0]" bind:this={container}>
			<canvas bind:this={canvas} id="main-canvas"></canvas>
		</div>
		<NavBar {camPos} />
	</main>
</div>
