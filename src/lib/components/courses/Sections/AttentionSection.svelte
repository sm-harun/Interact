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
	<div class="w-full flex justify-start" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		<blockquote class="blockquote text-lg">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html renderText(section.title)}
		</blockquote>
	</div>
{/if}
{#if showButton && !section.skip}
	<div class="w-full pb-2 flex justify-end items-center mt-5">
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
