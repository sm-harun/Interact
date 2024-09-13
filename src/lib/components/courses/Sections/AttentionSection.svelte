<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { type BasicSection } from '$lib/stores/courses';

	export let section: BasicSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	let showButton = showNextButton;

	function hideButton() {
		showButton = false;
	}
</script>

<div class="w-full flex justify-start">
	<blockquote class="blockquote text-lg" in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}>
		{section.title}
	</blockquote>
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
</div>
