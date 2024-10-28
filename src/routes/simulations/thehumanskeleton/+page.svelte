<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as Three from 'three';

	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { tweened } from 'svelte/motion';

	import gsap from 'gsap';

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
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex flex-col xl:flex-row overflow-hidden">
		<div class="flex-[2_1_0]" bind:this={container}>
			<canvas bind:this={canvas} id="main-canvas"></canvas>
		</div>
		<div class="flex-1 bg-surface-100-800-token p-10 overflow-y-auto">
			<h1 class="h1">The Human Skeleton</h1>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() => camPos(0.42, 3.31, 1.1, -2.88, 1.94, -3.88)}>The Skull</button
				>
				<p>
					This bony structure protects the brain and supports the facial structure. It consists of
					several bones fused together, including the frontal, parietal, occipital, and temporal
					bones.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() =>
						camPos(
							-0.04256517403098109,
							1.8884632943557536,
							1.4380103944402451,
							-0.037895498554093326,
							-1.36281968100475,
							-4.395510831864184
						)}>Ribcage (Thoracic Cage)</button
				>
				<p>
					Composed of ribs and the sternum, it protects the heart and lungs. There are 12 pairs of
					ribs, connected to the spine and sternum, with the lower ribs being more flexible.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() => camPos(0.01710151577782377, 2.535, 1.026, -0.037, -1.362, -4.395)}
					>Clavicle (Collarbone)</button
				>
				<p>
					A long bone that runs horizontally across the front of the shoulder. It connects the arm
					to the body and helps with shoulder movement.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() => camPos(-1.091, 2.612, -1.281, -0.143, -4.48, 3.152)}
					>Scapula (Shoulder Blade)</button
				>
				<p>
					A flat, triangular bone located on the upper back, aiding in shoulder movement and muscle
					attachment.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() =>
						camPos(-1.5878253642273372, 2.3502056428404976, -0.23052700054321135, 0, 0, 0)}
					>Humerus</button
				>
				<p>
					The long bone of the upper arm, running from the shoulder to the elbow. It helps form the
					ball-and-socket joint at the shoulder and the hinge joint at the elbow.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() => camPos(2.821140491880763, 0.528520953490227, 0.5192174259698517, 0, 0, 0)}
					>Radius and Ulna</button
				>
				<p>
					These are the two bones of the forearm. The radius is on the thumb side, and the ulna is
					on the pinky side. Together, they allow for wrist and elbow movement.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() =>
						camPos(-0.005281986426970726, 0.3591750770339941, 1.0070987454090417, 0, 0, 0)}
					>Pelvis</button
				>
				<p>
					A large bony structure at the base of the spine, made up of the ilium, ischium, and pubis.
					It supports the weight of the upper body when sitting or standing.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() =>
						camPos(-1.291032972273586, -2.978302601995149, 0.08254831728223572, 0, 0, 0)}
					>Femur</button
				>
				<p>
					The thigh bone, which is the longest and strongest bone in the body. It runs from the hip
					to the knee.
				</p>
			</section>
			<section class="mt-4 p-5">
				<button
					class="h3 btn underline underline-offset-4"
					onclick={() =>
						camPos(1.007026919029579, -4.858627370926829, 0.03176244191537859, 0, 0, 0)}
					>Tibia and Fibula</button
				>
				<p>
					The two bones of the lower leg. The tibia, or shinbone, is the larger and stronger of the
					two, while the fibula runs alongside it and helps stabilize the ankle.
				</p>
			</section>
		</div>
	</main>
</div>
