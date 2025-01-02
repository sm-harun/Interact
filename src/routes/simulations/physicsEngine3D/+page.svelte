<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';
	import Scene from './Scene.svelte';
	import { Pane, Button } from 'svelte-tweakpane-ui';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NavBar from './NavBar.svelte';
	import Footer from './Footer.svelte';

	let reset: () => any | undefined = $state();
	let changeGravity: () => any | undefined = $state();
	let changePlaying: () => any | undefined = $state();

	let playing = $state(true);

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
				changePlaying();
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
	<main class="absolute top-0 right-0 w-screen h-screen flex flex-col">
		<Pane title="" position="fixed">
			<Button title="Reset" on:click={reset} />
		</Pane>
		<div class="absolute size-full">
			<Canvas>
				<World>
					<Scene bind:reset bind:changeGravity bind:playing bind:changePlaying />
				</World>
			</Canvas>
		</div>

		<NavBar />

		<Footer bind:changeGravity bind:playing bind:changePlaying />
	</main>
</div>

<style>
	div {
		height: 100%;
	}
</style>
