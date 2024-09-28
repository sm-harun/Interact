<script lang="ts">
	import type { QuestionSection } from '$lib/stores/courses';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly, slide, fade } from 'svelte/transition';
	import { renderText } from '$lib/stores/themes';

	export let section: QuestionSection;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	// This will be used to control the explanation
	let explained = false;
	let wrongSelections = 0;
	let choiceUpdater = 0;

	// This will be used for the wrong answer icon
	let showIcon = false;

	// The in animation won't display unless manually shown on mount
	let show = false;

	// This is for the continue button, it will be displayed when answered
	let showButton: boolean;
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
			class="w-full bg-surface-200-700-token rounded-container-token p-4 transition border-token relative {explained
				? 'border-success-500'
				: 'border-primary-500'}"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
		>
			<h1 class="h4 w-full flex items-center gap-3">
				<span class="font-black italic">Q. </span>
				{@html renderText(section.title)}
			</h1>

			<!-- Checking if there is atleast one choice -->
			{#if section.choices.length != 0}
				<hr class="mt-3 mb-3" />
			{/if}

			<div class="px-5 flex flex-col">
				{#key choiceUpdater}
					{#each section.choices as choice, i}
						<button
							class="{wrongSelections == i + 1
								? 'border-[0.05rem] border-error-500'
								: ''} {explained && i + 1 == section.answer
								? 'bg-success-500/50'
								: 'hover:bg-primary-500/30'} {!explained && wrongSelections == i + 1
								? 'bg-primary-500/30'
								: ''} w-full mt-2 p-3 rounded-container-token active:scale-[98%] transition flex items-center justify-start"
							on:click={() => answered(i + 1)}
						>
							<span class="font-bold">{letter(i + 1)}. </span>
							<span class="text-lg ml-2">{@html renderText(choice)}</span>
						</button>
					{/each}
				{/key}
			</div>

			<!-- This indicates an error when a user chooses wrong choice -->
			{#if showIcon && !explained}
				<p
					class="text-error-500 absolute top-full right-0 mt-5 text-2xl font-bold flex gap-2 items-center"
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

			<!-- This only appears if there are no choices in the question -->
			{#if section.choices.length == 0 && !explained}
				<button
					class="btn variant-filled-primary z-10 absolute top-full right-0 mt-5"
					on:click={() => answered(-1)}
					transition:slide>Show Answer!</button
				>
			{/if}
		</main>

		<!-- This is the explanation -->
		{#if explained}
			<div
				class="w-full bg-surface-200-700-token rounded-container-token p-4 mb-5 transition -z-10"
				transition:fly={{ y: -20 }}
			>
				<h3 class="h5 font-bold">Explanation:</h3>
				<p>{@html renderText(section.explanation)}</p>
			</div>
		{/if}

		<!-- This is a place-holder, it keeps the size of the container the same shape when the explanation is revealed -->
		{#if !explained}
			<div class="w-full p-4 mb-5 transition -z-10 opacity-0">
				<h3 class="h5 font-bold">Explanation:</h3>
				<p>{@html renderText(section.explanation)}</p>
			</div>
		{/if}
		<!-- This is a place-holder, it keeps the size of the container the same shape when the explanation is revealed -->

		{#if showButton && !section.skip}
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
{/if}
