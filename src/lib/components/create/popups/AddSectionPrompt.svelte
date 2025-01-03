<script lang="ts">
	import { hideSectionPopup, sectionPopupPosition } from '$lib/stores/components';
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	let popupElement: HTMLDivElement = $state();

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
	class="variant-surface-700 card fixed z-50 w-52 p-3 rounded-container-token"
	style="top: {$sectionPopupPosition.y}px; right: {$sectionPopupPosition.x}px;"
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300, delay: 200 }}
>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Text');
			hideSectionPopup();
		}}>Text</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('List');
			hideSectionPopup();
		}}>List</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Equation');
			hideSectionPopup();
		}}>Equation</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Question');
			hideSectionPopup();
		}}>Question</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('TrueOrFalse');
			hideSectionPopup();
		}}>True | False</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Pick');
			hideSectionPopup();
		}}>Pick Question</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Attention');
			hideSectionPopup();
		}}>Attention</button
	>
	<button
		class="btn w-full text-xl rounded-container-token hover:bg-primary-500/30"
		onclick={() => {
			$sectionPopupPosition.callback('Visual');
			hideSectionPopup();
		}}>Visual</button
	>
</div>
