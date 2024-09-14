<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import HomeButton from '$lib/components/general/header/HomeButton.svelte';

	export let section: PickSection;
	export let showNextButton: boolean;
	export let showNextSection: () => void;

	let slicedAnswers: string[];

	// This will update the choices for use (flexible)
	let choicesUpdater = 0;
	function updateChoices() {
		choicesUpdater++;
	}

	// This will hold all the answered questions
	let answeredChoices: string[] = [];

	// These will check if we should show the Continue button
	let showButton = false;
	let allAnswered: boolean;

	onMount(() => {
		slicedAnswers = section.answers;
	});

	function evaluateAnswer(choice: string) {
		if (section.answers.includes(choice)) {
			answeredChoices.push(choice);
			updateChoices();

			// The show button will now be able to be visible
			// As long as the sliced array becomes empty and it is not the last section
			showButton = showNextButton;

			slicedAnswers.splice(slicedAnswers.indexOf(choice), 1);
			allAnswered = JSON.stringify(slicedAnswers) == JSON.stringify([]);
		}
	}

	function hideButton() {
		showButton = false;
	}
</script>

<div
	class="w-full variant-filled-surface rounded-container-token p-4 relative transition border-2 {allAnswered
		? 'border-success-500'
		: 'border-transparent'}"
>
	<h1 class="h4 w-full flex items-center gap-3">
		<span class="font-black italic">Q. </span>
		{section.title}
	</h1>

	<div class="w-full flex flex-wrap gap-3 mt-5 justify-center">
		{#key choicesUpdater}
			{#each section.choices as choice}
				<button
					class="btn p-3 px-5 {answeredChoices.includes(choice)
						? 'variant-ghost-success'
						: 'variant-ghost-primary'}"
					on:click={() => evaluateAnswer(choice)}
				>
					{choice}
				</button>
			{/each}
		{/key}
	</div>
</div>
{#if showButton && allAnswered}
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
