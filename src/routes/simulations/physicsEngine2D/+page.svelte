<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import Footer from './Footer.svelte';
	import MatterScene from './MatterScene.svelte';
	import NavBar from './NavBar.svelte';
	import { engineSettings } from './states.svelte';

	$effect.pre(() => {
		// Event listner to use the Space bar to Pause and Play the simulation
		// Exeptions are when focused on input elements that are not type number
		function listenSpaceKey(e: any) {
			if (
				e.code == 'Space' &&
				((e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ||
					e.target.type == 'number')
			) {
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

<div class="relative flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute right-0 top-0 flex size-full flex-col">
		<NavBar />
		<!-- This will hold the matter canvas scene -->
		<MatterScene />

		<Footer />
	</main>
</div>
