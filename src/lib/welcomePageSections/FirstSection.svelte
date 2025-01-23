<script lang="ts">
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/themes';
	import { T, Canvas } from '@threlte/core';
	import { onMount } from 'svelte';
	import { getCurrentThemeColor } from '$lib/utils';
	import * as THREE from 'three';
	import { spring } from 'svelte/motion';
	import { onDestroy } from 'svelte';
	import { modeUserPrefers } from '@skeletonlabs/skeleton';

	let rotation: [x: number, y: number, z: number] = $state([0, 0, 0]);
	let currentTime = 0;

	let knotOptions = $state([100, 6, 500, 10, 1, 10]);

	let color = $state('rgb(0, 0, 0)');

	function rotationLoop(t: number = 0) {
		let delta = currentTime - t;
		currentTime = t;

		rotation[0] += 0.0001 * delta;
		rotation[1] += 0.0001 * delta;
		rotation[2] += 0.0001 * delta;

		knotOptions[4] += 0.00001 * delta;

		requestAnimationFrame(rotationLoop);
	}

	onMount(() => {
		rotationLoop();

		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('final-state');
				}
			});
		});

		let elements = document.querySelectorAll('.observe');
		elements.forEach((element) => observer.observe(element));
	});

	$effect(() => {
		$theme;

		color = getCurrentThemeColor('primary');
	});

	function goToCourses() {
		goto('/courses');
	}

	// const opacityValue = tweened(100, {
	// 	duration: 5000,
	// 	easing: elasticInOut
	// });

	const opacityValue = spring(100, {
		stiffness: 0.4,
		damping: 0.1
	});

	let toggle = true;

	function toogleOpacity() {
		opacityValue.set(toggle ? 100 : 0);
		toggle = !toggle;
	}

	toogleOpacity();

	const interval = setInterval(toogleOpacity, 8000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<section class="flex flex-1">
	<div
		class="flex h-full w-full flex-col gap-5 py-[15%] text-center md:gap-1 lg:text-left xl:w-1/2"
	>
		<!-- Title -->
		<h1 class="intro-title observe h1 text-5xl font-bold text-primary-500 sm:text-5xl lg:text-7xl">
			Insight
		</h1>

		<!-- Quotes -->
		<h2
			class="intro-title observe h2 text-xl font-bold text-secondary-500 sm:text-2xl lg:mt-3 lg:text-3xl"
		>
			Interact, Innovate, Inspire!
		</h2>

		<!-- Description -->
		<p
			class="intro-text observe variant-glass text-surface-600-300-token my-10 max-w-[100%] rounded-xl p-3 text-sm xl:text-base 2xl:text-xl"
		>
			"An interactive platform designed to support your learning and development. Explore a wide
			range of resources to deepen your knowledge, discover new topics, and advance your skills at
			your own pace."
		</p>

		<!-- Sign up button -->
		<div class="intro-button observe">
			<button
				class="variant-filled-surface btn rounded-full text-base 2xl:text-lg"
				onclick={goToCourses}>Go To Courses</button
			>
		</div>

		<span class="final-state sr-only">test</span>
	</div>

	<!-- Canvas -->
	<div
		class="canvas-section observe absolute right-0 top-0 -z-40 size-full overflow-hidden xl:block"
	>
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[-70, 60, 350]} />

			<T.AmbientLight position={[0, 10, 10]} intensity={$modeUserPrefers ? 2 : 0.2} />
			<T.DirectionalLight position={[0, 10, 70]} intensity={2} />

			<!-- The wireframe only mode -->
			<T.Group>
				<T.Mesh {rotation} castShadow receiveShadow>
					<T.TorusKnotGeometry args={knotOptions} />
					<T.MeshBasicMaterial
						{color}
						wireframe={true}
						transparent
						opacity={(100 - $opacityValue) / 100}
					/>
				</T.Mesh>
			</T.Group>

			<!-- Standard wireframe with standard mateial mode -->
			<T.Group>
				<T.Mesh {rotation} castShadow receiveShadow>
					<T.TorusKnotGeometry args={knotOptions} />
					<T.MeshStandardMaterial
						{color}
						wireframe={true}
						transparent
						opacity={$opacityValue / 100}
						side={THREE.DoubleSide}
					/>
				</T.Mesh>
				<T.Mesh {rotation} castShadow receiveShadow>
					<T.TorusKnotGeometry args={knotOptions} />
					<T.MeshStandardMaterial
						{color}
						side={THREE.DoubleSide}
						transparent
						opacity={(100 - $opacityValue) / 100}
					/>
				</T.Mesh>
			</T.Group>
		</Canvas>
	</div>
</section>

<style>
	.intro-title {
		transform: translateX(-100px);
		opacity: 0;

		transition: all 1s ease-in-out;
	}

	.intro-text {
		transform: translateX(-200px);
		opacity: 0;

		transition: all 1s ease-in-out;
	}

	.intro-button {
		transform: translateX(-300px);
		opacity: 0;

		transition: all 1s ease-in-out;
	}

	.canvas-section {
		transform: translateX(150px);
		opacity: 0;

		transition: all 1s ease-in-out 0.5s;
	}

	.final-state {
		opacity: 1;
		transform: translateX(0);
	}
</style>
