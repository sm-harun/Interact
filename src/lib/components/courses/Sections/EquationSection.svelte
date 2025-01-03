<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { EquationSectionType } from '$lib/stores/courses';

	import katex from 'katex';

	interface Props {
		section: EquationSectionType;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();

	let showButton = $state(showNextButton);

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
		<h4 class="h2 grid w-full place-items-center">{section.title}</h4>
	{/if}
	<div class="mt-6 flex flex-wrap justify-around gap-10 p-5">
		{#each section.equations as equation}
			<div class="text-xl">
				{@html renderEquation(equation)}
			</div>
		{/each}
	</div>
</div>

{#if showNextSection && showButton && !section.skip}
	<div class="mt-6 flex w-full items-center justify-end pb-2">
		<button
			class="variant-filled-primary btn mr-6 scale-110 animate-bounce shadow-lg shadow-primary-500"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
			out:slide
			onclick={() => {
				showNextSection();
				hideButton();
			}}>Continue</button
		>
	</div>
{/if}
