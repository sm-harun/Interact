<script lang="ts">
	import type { QuestionSection } from '$lib/stores/courses';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly, slide, fade } from 'svelte/transition';
	import { renderText } from '$lib/stores/themes';

	interface Props {
		section: QuestionSection;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();

	// This will be used to control the explanation
	let explained = $state(false);
	let wrongSelections = $state(0);
	let choiceUpdater = $state(0);

	// This will be used for the wrong answer icon
	let showIcon = $state(false);

	// The in animation won't display unless manually shown on mount
	let show = $state(false);

	// This is for the continue button, it will be displayed when answered
	let showButton: boolean = $state();
	// This is for making sure the continue button doesn't appear
	let shown = false;

	onMount(() => {
		show = true;
		if (section.skip) showNextSection();
	});

	// To convert the numbers for choices to letters
	function letter(number: number) {
		if (number == 1) return 'A';
		if (number == 2) return 'B';
		if (number == 3) return 'C';
		if (number == 4) return 'D';
		if (number == 5) return 'E';
		if (number == 6) return 'F';
		if (number == 7) return 'G';
	}

	function answered(answer: number) {
		if (answer === section.answer) {
			explained = true;
			choiceUpdater++;

			// It will only show for one time only
			if (!shown) showButton = showNextButton;

			// The wrong choice will only be highlighted before the question has been answered
		} else if (answer != section.answer && !explained) {
			wrongSelections = answer;
			showIcon = true;
			choiceUpdater++;
		}
	}

	// Hide continue button
	function hideButton() {
		showButton = false;
		// This makes sure clicking the answer doesn't retrigger the continue button
		shown = true;
	}
</script>

{#if show}
	<div class="relative w-auto self-center">
		<main
			class="bg-surface-200-700-token relative w-full p-4 transition border-token rounded-container-token {explained
				? 'border-success-500'
				: 'border-primary-500'}"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
		>
			<h1 class="h4 flex w-full items-center gap-3">
				<span class="font-black italic">Q. </span>
				{@html renderText(section.title)}
			</h1>

			<!-- Checking if there is atleast one choice -->
			{#if section.choices.length != 0}
				<hr class="mb-3 mt-3" />
			{/if}

			<div class="flex flex-col px-5">
				{#key choiceUpdater}
					{#each section.choices as choice, i}
						<button
							class="border-[0.05rem] {wrongSelections == i + 1
								? 'border-error-500'
								: 'border-transparent'} {explained && i + 1 == section.answer
								? 'bg-success-500/50'
								: 'hover:bg-primary-500/30'} {!explained && wrongSelections == i + 1
								? 'bg-primary-500/30'
								: ''} mt-2 flex w-full items-center justify-start p-3 transition rounded-container-token active:scale-[98%]"
							onclick={() => answered(i + 1)}
						>
							<span class="font-bold">{letter(i + 1)}. </span>
							<span class="ml-2 text-lg">{@html renderText(choice)}</span>
						</button>
					{/each}
				{/key}
			</div>

			<!-- This indicates an error when a user chooses wrong choice -->
			{#if showIcon && !explained}
				<p
					class="absolute right-0 top-full mt-5 flex items-center gap-2 text-2xl font-bold text-error-500"
					transition:fade
				>
					<span>Error</span>
					<svg
						viewBox="0 0 50 50"
						xml:space="preserve"
						fill="#000000"
						class="size-5"
						transition:fade
					>
						<circle style="fill:#D75A4A;" cx="25" cy="25" r="25"></circle>
						<polyline
							style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
							points="16,34 25,25 34,16 "
						></polyline>
						<polyline
							style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;"
							points="16,16 25,25 34,34 "
						></polyline>
					</svg>
				</p>
			{/if}

			<!-- This only appears if there is no answer in the choices, or there are not choices -->
			{#if section.answer === 0 && !explained}
				<button
					class="variant-filled-primary btn absolute right-0 top-full z-10 mt-5"
					onclick={() => answered(0)}
					transition:slide>Show Answer!</button
				>
			{/if}
		</main>

		<!-- This is the explanation -->
		{#if explained}
			<div
				class="bg-surface-200-700-token -z-10 mb-5 w-full p-4 transition rounded-container-token"
				transition:fly={{ y: -20 }}
			>
				<h3 class="h5 font-bold">Explanation:</h3>
				<p>{@html renderText(section.explanation)}</p>
			</div>
		{/if}

		<!-- This is a place-holder, it keeps the size of the container the same shape when the explanation is revealed -->
		{#if !explained}
			<div class="-z-10 mb-5 w-full p-4 opacity-0 transition">
				<h3 class="h5 font-bold">Explanation:</h3>
				<p>{@html renderText(section.explanation)}</p>
			</div>
		{/if}
		<!-- This is a place-holder, it keeps the size of the container the same shape when the explanation is revealed -->

		{#if showButton && !section.skip}
			<div class="flex w-full items-center justify-end pb-2">
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
	</div>
{/if}
