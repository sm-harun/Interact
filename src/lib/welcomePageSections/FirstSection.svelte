<script lang="ts">
	import { goto } from '$app/navigation';
	import { T, Canvas } from '@threlte/core';
	import { OrbitControls, TransformControls } from '@threlte/extras';
	import { onMount } from 'svelte';

	let rotation = $state([0, 0, 0]);
	let currentTime = 0;

	function rotationLoop(t: number = 0) {
		let delta = currentTime - t;
		currentTime = t;

		rotation[0] += 0.0003 * delta;
		rotation[1] += 0.0003 * delta;
		rotation[2] += 0.0003 * delta;

		requestAnimationFrame(rotationLoop);
	}

	onMount(() => {
		rotationLoop();
	});

	function goToCourses() {
		goto('/courses');
	}
</script>

<section class="flex flex-1">
	<div class="flex flex-1 flex-col py-[15%] xl:px-10">
		<!-- Title -->
		<h1 class="h1 text-6xl font-bold xl:text-7xl 2xl:text-9xl">Insight</h1>

		<!-- Quotes -->
		<h2 class="h2 mt-3 text-xl font-bold text-primary-500 xl:text-3xl 2xl:text-5xl">
			Interact, Innovate, Inspire!
		</h2>

		<!-- Description -->
		<p class="text-surface-600-300-token my-10 max-w-[90%] text-base xl:text-lg 2xl:text-2xl">
			"An interactive platform designed to support your learning and development. Explore a wide
			range of resources to deepen your knowledge, discover new topics, and advance your skills at
			your own pace."
		</p>

		<!-- Sign up button -->
		<div>
			<button
				class="variant-filled-surface btn rounded-full text-base xl:px-5 xl:py-2 xl:text-lg 2xl:px-10 2xl:py-5 2xl:text-xl"
				onclick={goToCourses}>Go To Courses</button
			>
		</div>
	</div>

	<!-- Canvas -->
	<div class="hidden flex-1 xl:block">
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[0, 0, 300]}>
				<!-- <OrbitControls target={[0, 0, 0]} maxDistance={1000} minDistance={0.3} /> -->
			</T.PerspectiveCamera>

			<T.Mesh {rotation}>
				<T.TorusKnotGeometry args={[60, 6, 200, 10]}></T.TorusKnotGeometry>
				<T.MeshBasicMaterial color="red" wireframe={true}></T.MeshBasicMaterial>
			</T.Mesh>
		</Canvas>
	</div>
</section>
