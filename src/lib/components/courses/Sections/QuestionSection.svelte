<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';

	export let section: any;
	export let showNextSection: any;
	export let showNextButton: boolean;

	// This will be used to control the explanation.
	let explained = false;
	let wrongSelections = 0;
	let choiceUpdater = 0;

	// The in animation won't display unless manually showwen on mount.
	let show = false;

	let showButton: boolean;

	onMount(() => {
		show = true;
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
			showButton = showNextButton;
			choiceUpdater++;
		} else {
			wrongSelections = answer;
			choiceUpdater++;
		}
	}

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<div>
		<main
			class="w-auto bg-surface-200-700-token rounded-container-token p-4 transition border-token transition-height {explained
				? 'border-success-500'
				: 'border-primary-500'}"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
		>
			<h1 class="h4 w-full flex items-center gap-3">
				<span class="font-black italic">Q. </span>
				{section.title}
			</h1>
			<hr class="mt-3 mb-3" />
			<div class="px-5 flex flex-col">
				{#key choiceUpdater}
					{#each section.choices as choice, i}
						<button
							class="{wrongSelections == i + 1
								? 'border-[0.05rem] border-error-500'
								: ''} {explained && i + 1 == section.answer
								? 'bg-success-500/50'
								: 'hover:bg-primary-500/30'} w-full mt-2 p-3 rounded-container-token active:scale-[98%] transition flex items-center justify-start"
							on:click={() => answered(i + 1)}
						>
							<span class="font-bold">{letter(i + 1)}. </span>
							<span class="text-lg ml-2">{choice}</span>
						</button>
					{/each}
				{/key}
			</div>
		</main>

		{#if explained}
			<div
				class="w-full bg-surface-200-700-token rounded-container-token p-4 mb-5 transition -z-10"
				transition:fly={{ y: -20 }}
			>
				<h3 class="h5 font-bold">Explanation:</h3>
				<p>{section.explanation}</p>
			</div>
		{/if}
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
{/if}
