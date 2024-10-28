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
		class="w-full bg-surface-100-800-token rounded-container-token p-4 mb-5"
		in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
	>
		<h3 class="h3 ml-5">{@html renderText(section.title)}</h3>
		<ul class="list-disc px-5 mt-3">
			{#each section.list as list}
				<li class="text-lg mt-5">{@html renderText(list)}</li>
			{/each}
		</ul>
	</main>
{/if}
{#if showNextButton && showButton && !section.skip}
	<div class="w-full pb-2 flex justify-end items-center mt-6">
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
