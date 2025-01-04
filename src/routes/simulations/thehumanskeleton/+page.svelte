<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NavBar from './NavBar.svelte';

	import * as Threlte from '@threlte/core';
	import Scene from './Scene.svelte';
</script>

<div class="flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute size-full flex-grow">
		<Threlte.Canvas>
			<Scene />
		</Threlte.Canvas>
		<NavBar />
	</main>
</div>
