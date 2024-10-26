<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as Three from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	let canvas: HTMLCanvasElement = $state();
	let animationFrameId: number;

	onMount(() => {
		const scene = new Three.Scene();
		const camera = new Three.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new Three.WebGLRenderer({
			canvas: canvas
		});

		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		camera.position.set(30, 30, 50);

		const spiralGeometry = new Three.Mesh(
			new Three.TorusKnotGeometry(60, 5, 200, 16),
			new Three.MeshBasicMaterial({ color: 0x32a893, wireframe: true })
		);
		spiralGeometry.position.setX(0);

		scene.add(spiralGeometry);

		const controls = new OrbitControls(camera, renderer.domElement);

		function loop() {
			spiralGeometry.rotation.x += 0.002;
			spiralGeometry.rotation.y += 0.002;
			spiralGeometry.rotation.z += 0.002;

			controls.update();

			renderer.render(scene, camera);
			animationFrameId = requestAnimationFrame(loop);
		}

		loop();
	});

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId);
	});
</script>

<main
	class="h-auto w-auto grid place-items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
	<h1 class="h1 text-3xl lg:text-5xl 2xl:text-7xl">
		<span class="">Welcome to Interact </span>
	</h1>
	<h1 class="h1">
		<a href="/home" class="btn variant-ghost-primary text-2xl">Go to Home Page</a>
	</h1>
</main>
<canvas class="" bind:this={canvas} id="main-canvas"></canvas>
