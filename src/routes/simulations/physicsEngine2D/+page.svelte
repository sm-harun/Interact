<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import Footer from './Footer.svelte';
	import MatterScene from './MatterScene.svelte';
	import NavBar from './NavBar.svelte';

	type EngineSettings = {
		timeScale: number;
		timeState: boolean; // Weather it is played or not
		gravityScale: number;
		gravityX: number;
		gravityY: number;
	};

	let engineSettings: EngineSettings = $state({
		timeScale: 1,
		timeState: true,
		gravityScale: 0.001,
		gravityX: 0,
		gravityY: 1
	});

	$effect.pre(() => {
		// Event listner to use the Space bar to Pause and Play the simulation
		function listenSpaceKey(e: any) {
			e.preventDefault();

			if (e.code == 'Space') {
				engineSettings.timeState = !engineSettings.timeState;
			}
		}

		window.addEventListener('keydown', listenSpaceKey);

		return () => {
			window.removeEventListener('keydown', listenSpaceKey);
		};
	});
</script>

<div class="h-screen flex flex-col relative">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute top-0 right-0 size-full flex flex-col">
		<NavBar />
		<!-- This will hold the matter canvas scene -->
		<MatterScene bind:engineSettings />

		<Footer bind:engineSettings />
	</main>
</div>
