<script lang="ts">
	import { dictPopupPosition } from '$lib/stores/components';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	let popupElement: HTMLDivElement;

	// These are the types for the dictionaryapi
	type word = {
		word: string;
		phonetic: string;
		phonetics: { text: string; audio?: string }[];
		origin: string;
		meanings: meaning[];
	};

	type meaning = {
		partOfSpeech: string;
		definitions: definition[];
	};

	type definition = {
		definition: string;
		example: string;
		synonmys: string[];
		antonyms: string[];
	};

	// This will make sure the popup never gets out of the window
	let revisedX: number;

	// This will hold every type of definition

	// Fetches the meaning of the word on mount
	onMount(async () => {
		if ($dictPopupPosition.x + popupElement?.clientWidth > window.innerWidth) {
			revisedX = $dictPopupPosition.x - popupElement?.clientWidth / 2;
		} else {
			revisedX = $dictPopupPosition.x;
		}
	});

	async function awaitDict() {
		let meanings: meaning[] = [];

		await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${$dictPopupPosition.info}`)
			.then((res) => res.json())
			.then((data: word[]) =>
				data[0].meanings.forEach((meaning: meaning) => {
					meanings.push(meaning);
				})
			);

		return meanings;
	}
</script>

<div
	class="w-72 card p-3 rounded-container-token variant-surface-700 z-50 fixed"
	style="top: {$dictPopupPosition.y}px; right: {revisedX}px;"
	bind:this={popupElement}
	in:fly={{ y: 10, duration: 300 }}
	out:fly={{ y: 10, duration: 300 }}
>
	{#await awaitDict()}
		<div class="w-full h-full grid place-items-center">
			<ProgressBar meter={'bg-primary-500 h-1'} track={'bg-surface-500 h-[0.2rem]'} />
		</div>
	{:then meanings}
		{#each meanings as meaning}
			<h1 class="mt-3">
				<span class="text-primary-500 text-lg font-bold">{$dictPopupPosition.info} </span>
				<span>/{meaning.partOfSpeech}</span>
			</h1>
			{#each meaning.definitions.slice(0, 2) as definition, i}
				<p class="mt-2"><span class="font-bold">{i + 1}. </span>{definition.definition}</p>
			{/each}
		{/each}
	{/await}
</div>
