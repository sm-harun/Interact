<script lang="ts">
	import { hideSectionPopup, sectionPopupPosition } from '$lib/stores/components';
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	let popupElement: HTMLDivElement;

	function listentopointer(e: PointerEvent) {
		if (!popupElement.contains(e.target)) {
			hideSectionPopup();
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
	bind:this={popupElement}
	class="w-52 card p-3 rounded-container-token variant-surface-700 z-50 fixed"
	style="top: {$sectionPopupPosition.y}px; right: {$sectionPopupPosition.x}px;"
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300, delay: 200 }}
>
	<button
		class="text-xl btn rounded-container-token w-full hover:bg-primary-500/30"
		on:click={() => {
			$sectionPopupPosition.callback('Text');
			hideSectionPopup();
		}}>Text</button
	>
	<button
		class="text-xl btn rounded-container-token w-full hover:bg-primary-500/30"
		on:click={() => {
			$sectionPopupPosition.callback('Question');
			hideSectionPopup();
		}}>Question</button
	>
	<button
		class="text-xl btn rounded-container-token w-full hover:bg-primary-500/30"
		on:click={() => {
			$sectionPopupPosition.callback('Pick');
			hideSectionPopup();
		}}>Pick Question</button
	>
	<button
		class="text-xl btn rounded-container-token w-full hover:bg-primary-500/30"
		on:click={() => {
			$sectionPopupPosition.callback('List');
			hideSectionPopup();
		}}>List</button
	>
	<button
		class="text-xl btn rounded-container-token w-full hover:bg-primary-500/30"
		on:click={() => {
			$sectionPopupPosition.callback('Visual');
			hideSectionPopup();
		}}>Visual</button
	>
</div>
