<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let section;
	export let showNextSection;
	export let showNextButton: boolean;

	// The in animation won't display unless manually showwen on mount.
	let show = false;

	let showButton: boolean;

	onMount(() => {
		show = true;
		showButton = showNextButton;
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
		<p class="text-lg">{section.text}</p>
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
