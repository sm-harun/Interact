<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import MatterScene from './MatterScene.svelte';
	import NavBar from './NavBar.svelte';
	import ObjectCreationModal from './NavBarSections/objectSection/ObjectCreationModal.svelte';
	import { engineSettings } from './states.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(true);

	const modalStore = getModalStore();
	const objectModalComponent: ModalComponent = { ref: ObjectCreationModal };

	const objectModalSettings: ModalSettings = {
		type: 'component',
		component: objectModalComponent
	};

	function triggerModal() {
		modalStore.trigger(objectModalSettings);
	}

	$effect.pre(() => {
		// Event listner to use the Space bar to Pause and Play the simulation
		// Exeptions are when focused on input elements that are not type number
		function listenKeyPress(e: any) {
			handleSpaceKey(e);
			handleCtrlBindings(e);
		}

		function handleCtrlBindings(e: any) {
			if (!e.ctrlKey) return;
			e.preventDefault();

			switch (e.key) {
				case 'z':
					navBarStatus = !navBarStatus;
					break;
				case 'a':
					e.preventDefault();
					triggerModal();
					break;
			}
		}

		function handleSpaceKey(e: any) {
			if (
				e.code == 'Space' &&
				((e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') ||
					e.target.type == 'number')
			) {
				e.preventDefault();
				engineSettings.timeState = !engineSettings.timeState;
			}
		}

		window.addEventListener('keydown', listenKeyPress);

		return () => {
			window.removeEventListener('keydown', listenKeyPress);
		};
	});
</script>

<div class="relative flex h-screen flex-col">
	<MainHeader showBackButton={true} showMainRoutes={false} showSlidder={true} />
	<main class="absolute right-0 top-0 flex size-full flex-col">
		<NavBar bind:navBarStatus />
		<!-- This will hold the matter canvas scene -->
		<MatterScene />
	</main>
</div>
