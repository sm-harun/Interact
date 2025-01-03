<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { renderText } from '$lib/stores/themes';

	interface Props {
		section: ListSection;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();

	let show = $state(false);
	let showButton = $state(true);

	onMount(() => {
		show = true;
		if (section.skip) showNextSection();
	});

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<main
		class="bg-surface-100-800-token mb-5 w-full p-4 rounded-container-token"
		in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
	>
		<h3 class="h3 ml-5">{@html renderText(section.title)}</h3>
		<ul class="mt-3 list-disc px-5">
			{#each section.list as list}
				<li class="mt-5 text-lg">{@html renderText(list)}</li>
			{/each}
		</ul>
	</main>
{/if}
{#if showNextButton && showButton && !section.skip}
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
