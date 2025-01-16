<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import SideMenu from './SideMenu.svelte';
</script>

<div class="flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute flex size-full flex-grow">
		<div class="h-full flex-1">
			<Canvas>
				<Scene />
			</Canvas>
		</div>
		<SideMenu />
	</main>
</div>
