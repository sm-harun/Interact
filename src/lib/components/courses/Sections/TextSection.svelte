<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { renderText } from '$lib/stores/themes';

	import { showDictPopup, hideDictPopup } from '$lib/stores/components.ts';
	import { getDoc } from 'firebase/firestore';
	import { getLessonsDoc } from '$lib/docRefs';
	import type { ExplainSection } from '$lib/stores/courses';

	interface Props {
		section: ExplainSection;
		showNextSection: any;
		showNextButton: boolean;
		course: string;
		lesson: string;
	}

	let { section, showNextSection, showNextButton, course, lesson }: Props = $props();

	// The in animation won't display unless manually showwen on mount.
	let show = $state(false);

	let showButton: boolean = $state();

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

		if (section.skip) showNextSection();
	});

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<main
		class="w-full bg-surface-100-800-token rounded-container-token p-4 mb-5"
		in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
	>
		<h1 class="w-full pl-5 h4">{@html renderText(section.title)}</h1>
		<hr class="mt-3 mb-3" />
		<p class="text-lg">{@html renderText(section.text)}</p>
	</main>
	{#if showButton && !section.skip}
		<div class="w-full pb-2 flex justify-end items-center">
			<button
				class="btn variant-filled-primary mr-6 animate-bounce scale-110 shadow-lg shadow-primary-500"
				in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
				out:slide
				onclick={() => {
					showNextSection();
					hideButton();
				}}>Continue</button
			>
		</div>
	{/if}
{/if}
<!-- <!-- Checks if the words need to display their meaning or not -->
<!-- {#each section.text.split(' ') as word} -->
<!-- 	{#if dictionaryapi.includes(word)} -->
<!-- 		<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- 		<span -->
<!-- 			aria-haspopup="true" -->
<!-- 			class="text-primary-500 font-bold hover:underline hover:brightness-150" -->
<!-- 			on:mouseleave={() => hideDictPopup()} -->
<!-- 			on:mouseenter={(e) => showDictPopup(e, word)} -->
<!-- 			>{word} -->
<!-- 		</span> -->
<!-- 		<span> </span> -->
<!-- 	{:else} -->
<!-- 		<span>{word} </span> -->
<!-- 		<span> </span> -->
<!-- 	{/if} -->
<!-- {/each} -->
<!-- <span>.</span> -->
