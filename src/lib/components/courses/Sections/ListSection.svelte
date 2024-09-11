<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let section: ListSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	let show = false;
	let showButton = true;

	onMount(() => {
		show = true;
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
		<h3 class="h3 ml-5">{section.title}</h3>
		<ul class="list-disc px-5 mt-3">
			{#each section.list as list}
				<li class="text-lg">{list}</li>
			{/each}
		</ul>
	</main>
{/if}
{#if showNextSection && showButton}
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
