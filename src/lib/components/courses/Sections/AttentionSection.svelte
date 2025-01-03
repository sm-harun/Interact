<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { type BasicSection } from '$lib/stores/courses';
	import { onMount } from 'svelte';
	import { renderText } from '$lib/stores/themes';

	interface Props {
		section: BasicSection;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();

	let showButton = $state(showNextButton);

	let show = $state(false);

	onMount(() => {
		show = true;

		if (section.skip) showNextSection();
	});

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<div class="flex w-full justify-start" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		<blockquote class="blockquote text-lg">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html renderText(section.title)}
		</blockquote>
	</div>
{/if}
{#if showButton && !section.skip}
	<div class="mt-5 flex w-full items-center justify-end pb-2">
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
