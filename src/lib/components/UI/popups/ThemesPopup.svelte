<script lang="ts">
	import { ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';

	import { fly } from 'svelte/transition';

	import type { Theme } from '$lib/stores/themes';
	import { setTheme, theme, updateTheme } from '$lib/stores/themes';
	import { hideThemesPopup, popupPosition } from '$lib/stores/components';

	import FullScreenToggler from './FullScreenToggler.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { getAuth } from 'firebase/auth';

	let currentTheme: Theme = $theme;
	let popupElement: HTMLDivElement;

	// Updates the theme store.
	$: {
		if (getAuth().currentUser) {
			updateTheme(currentTheme);
		} else {
			setTheme(currentTheme);
		}
	}

	function listentopointer(e: PointerEvent) {
		if (!popupElement.contains(e.target)) {
			hideThemesPopup();
		}
	}

	onMount(() => {
		window.addEventListener('pointerdown', listentopointer);
	});

	onDestroy(() => {
		window.removeEventListener('pointerdown', listentopointer);
	});
</script>

<div
	id="themes-popup"
	class="card w-60 lg:w-80 text-lg lg:text-xl p-5 variant-surface-700 z-50 border-1 absolute"
	style="top: {$popupPosition.y}px; right: {$popupPosition.x}px;"
	bind:this={popupElement}
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300, delay: 200 }}
>
	<div class="flex justify-between items-center">
		<p><strong><span class="hidden lg:inline">Dark</span> Mode</strong></p>
		<div class="flex justify-between items-center gap-2">
			<LightSwitch />
			<FullScreenToggler />
		</div>
	</div>
	<hr class="mt-4 mb-4" />
	<ListBox>
		<ListBoxItem bind:group={currentTheme} name="medium" value="crimson">Crimson</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="vintage">Vintage</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="hamlindigo">hamlindigo</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="modern">Modern</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="wintry">Wintry</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="seafoam">Seafoam</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="skeleton">Skeleton</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="rocket">Rocket</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="sahara">Sahara</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="gold-nouveau"
			>Gold Nouveau</ListBoxItem
		>
	</ListBox>
	<hr class="mt-4 mb-4" />
	<p class="text-xs text-secondary-700-200-token grid place-items-center">
		These themes are powered by <strong>Skeleton UI</strong>
	</p>
</div>
