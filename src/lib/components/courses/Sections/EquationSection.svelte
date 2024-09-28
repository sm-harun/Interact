<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { EquationSectionType } from '$lib/stores/courses';

	import katex from 'katex';

	export let section: EquationSectionType;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	let showButton = showNextButton;

	function hideButton() {
		showButton = false;
	}

	onMount(() => {
		if (section.skip) showNextSection();
	});

	function renderEquation(equation: string) {
		return katex.renderToString(equation, { throwOnError: false });
	}
</script>

<div class="w-full">
	{#if section.title !== ''}
		<h4 class="h2 w-full grid place-items-center">{section.title}</h4>
	{/if}
	<div class="mt-6 p-5 flex gap-10 justify-around flex-wrap">
		{#each section.equations as equation}
			<div class="text-xl">
				{@html renderEquation(equation)}
			</div>
		{/each}
	</div>
</div>

{#if showNextSection && showButton && !section.skip}
	<div class="w-full pb-2 flex justify-end items-center mt-6">
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
