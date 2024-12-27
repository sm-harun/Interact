<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import Footer from './Footer.svelte';
	import MatterScene from './MatterScene.svelte';
	import NavBar from './NavBar.svelte';
	import { engineSettings } from './states.svelte';

	$effect.pre(() => {
		// Event listner to use the Space bar to Pause and Play the simulation
		function listenSpaceKey(e: any) {
			if (e.code == 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
				e.preventDefault();
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
		<MatterScene />

		<Footer />
	</main>
</div>
