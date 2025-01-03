<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { renderText } from '$lib/stores/themes';

	interface Props {
		section: PickSection;
		showNextButton: boolean;
		showNextSection: () => void;
	}

	let { section, showNextButton, showNextSection }: Props = $props();

	let slicedAnswers: string[];

	// This will update the choices for use (flexible)
	let choicesUpdater = $state(0);
	function updateChoices() {
		choicesUpdater++;
	}

	// This will hold all the answered questions
	let answeredChoices: string[] = [];

	// These will check if we should show the Continue button
	let showButton = $state(false);
	let allAnswered: boolean = $state();

	onMount(() => {
		slicedAnswers = section.answers;
		if (section.skip) showNextSection();
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
	class="bg-surface-200-700-token relative w-full border-2 p-4 transition rounded-container-token {allAnswered
		? 'border-success-500'
		: 'border-transparent'}"
	in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
>
	<h1 class="h4 flex w-full items-center gap-3">
		<span class="font-black italic">Q. </span>
		{@html renderText(section.title)}
	</h1>

	<div class="mt-5 flex w-full flex-wrap justify-center gap-3">
		{#key choicesUpdater}
			{#each section.choices as choice}
				<button
					class="btn p-3 px-5 {answeredChoices.includes(choice)
						? 'variant-ghost-success'
						: 'variant-ghost-primary'}"
					onclick={() => evaluateAnswer(choice)}
				>
					{choice}
				</button>
			{/each}
		{/key}
	</div>
</div>
{#if showButton && allAnswered && !section.skip}
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
