<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NavBar from './NavBar.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute size-full flex-grow">
		<Canvas>
			<Scene />
		</Canvas>
		<NavBar />
	</main>
</div>
