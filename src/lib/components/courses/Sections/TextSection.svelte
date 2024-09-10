<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	import { showDictPopup, hideDictPopup } from '$lib/stores/components.ts';
	import { getDoc } from 'firebase/firestore';
	import { getLessonsDoc } from '$lib/docRefs';

	export let section;
	export let showNextSection;
	export let showNextButton: boolean;
	export let course: string;
	export let lesson: string;

	// The in animation won't display unless manually showwen on mount.
	let show = false;

	let showButton: boolean;

	// This is dummy data for now.
	let dictionaryapi: string[] = [];

	onMount(async () => {
		show = true;
		showButton = showNextButton;

		await getDoc(getLessonsDoc(course, lesson)).then((doc) => {
			if (doc.exists()) {
				dictionaryapi = doc.data().dictionary;
			}
		});
	});

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<main
		class="w-full variant-filled-surface rounded-container-token p-4 mb-5"
		in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
	>
		<h1 class="w-full pl-5 h4">{section.title}</h1>
		<hr class="mt-3 mb-3" />
		<p class="text-lg">
			<!-- Checks if the words need to display their meaning or not -->
			{#each section.text.split(' ') as word}
				{#if dictionaryapi.includes(word)}
					<span
						aria-haspopup="true"
						class="text-primary-500 font-bold hover:underline hover:brightness-150"
						on:mouseleave={() => hideDictPopup()}
						on:mouseenter={(e) => setTimeout(() => showDictPopup(e, word), 500)}
						>{word}
					</span>
					<span> </span>
				{:else}
					<span>{word} </span>
					<span> </span>
				{/if}
			{/each}
			<span>.</span>
		</p>
	</main>
	{#if showButton}
		<div class="w-full pb-2 flex justify-end items-center">
			<button
				class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
				in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
				out:slide
				on:click={() => {
					showNextSection();
					hideButton();
				}}>Continue</button
			>
		</div>
	{/if}
{/if}
