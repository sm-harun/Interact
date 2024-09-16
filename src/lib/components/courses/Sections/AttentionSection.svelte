<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { type BasicSection } from '$lib/stores/courses';
	import { onMount } from 'svelte';

	export let section: BasicSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	let showButton = showNextButton;

	let show = false;

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
			{section.title}
		</blockquote>
	</div>
{/if}
{#if showButton && !section.skip}
	<div class="w-full pb-2 flex justify-end items-center mt-5">
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
