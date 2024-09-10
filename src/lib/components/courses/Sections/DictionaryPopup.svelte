<script lang="ts">
	import { dictPopupPosition } from '$lib/stores/components';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let popupElement: HTMLDivElement;
	let show = false;

	// This will hold every type of definition
	let meanings: any[] = [];

	// Fetches the meaning of the word on mount
	onMount(async () => {
		await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${$dictPopupPosition.info}`)
			.then((res) => res.json())
			.then((data) =>
				data[0].meanings.forEach((meaning: any) => {
					meanings.push(meaning);
				})
			);
		show = true;
	});
</script>

{#if show}
	<div
		class="w-72 card p-3 rounded-container-token variant-surface-700 z-50 fixed"
		style="top: {$dictPopupPosition.y}px; right: {$dictPopupPosition.x}px;"
		bind:this={popupElement}
		in:fly={{ y: 10, duration: 300 }}
		out:fly={{ y: 10, duration: 300, delay: 200 }}
	>
		{#each meanings as meaning}
			<h1 class="mt-3">
				<span class="text-primary-500 text-lg font-bold">{$dictPopupPosition.info} </span>
				<span>/{meaning.partOfSpeech}</span>
			</h1>
			<h1>Definitions:</h1>
			{#each meaning.definitions as definition, i}
				<p class="mt-2"><span class="font-bold">{i + 1}. </span>{definition.definition}</p>
			{/each}
		{/each}
	</div>
{/if}
