<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NavBar from './NavBar.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let loaded = $state(true);

	let settings: HumanSkeleonSettings = $state({
		cameraPosition: [0, 0, 2.5],
		watchTarget: [0, 0, 0],
		directionLightPosition: [3, -10, 0],
		directionLightIntensity: 1,
		ambientLightIntensity: 1,
		lightColorSettings: true,
		directionLightColor: '#FFFFFF',
		ambientLightColor: '#FFFFFF'
	});
</script>

<div class="flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute size-full flex-grow">
		<Canvas>
			<Scene bind:loaded bind:settings />
		</Canvas>

		<NavBar bind:settings />

		{#if !loaded}
			<div
				class="absolute right-1/2 top-1/2 z-40 flex -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center gap-3 opacity-50"
			>
				<ProgressRadial width="w-12" height="h-12" strokeLinecap="round"></ProgressRadial>
				<p>Loading Model..<span class="animate-ping">..</span></p>
			</div>
		{/if}
	</main>
</div>
