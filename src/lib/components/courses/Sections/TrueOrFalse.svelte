<script lang="ts">
	import { type TrueOrFalseType } from '$lib/stores/courses';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { renderText } from '$lib/stores/themes';
	import { onMount } from 'svelte';

	export let section: TrueOrFalseType;
	export let showNextSection: () => void;
	export let showNextButton: boolean;

	let show = false;

	let showButton = true;

	let answered: number[] = [];
	let results: boolean[] = [];

	// This will check if the questions have been done
	let explained = false;

	onMount(() => {
		show = true;
		if (section.skip) showNextSection();
	});

	// This returns all elements of an array that are not null
	function lengthNotNull(arr: any[]): number {
		return arr.filter((element) => element !== null || element !== undefined).length;
	}

	function setAnswer(index: number, answer: number): void {
		// Only runs if the section hasn't been completely answered
		if (!explained) answered[index] = answer;

		if (lengthNotNull(answered) == section.answers.length) {
			// Filles the results array with the results by comparing the answers
			answered.forEach((answer: number, i: number) => results.push(answer === section.answers[i]));
			explained = true;
		}
	}

	function hideButton() {
		showButton = false;
	}
</script>

{#if show}
	<div class="relative w-auto self-center">
		<main
			class="w-full bg-surface-200-700-token rounded-container-token p-4 transition border-token border-transparent"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
		>
			<h1 class="h3 font-bold w-full mb-4 flex items-center gap-3">True or False</h1>
			{#each section.questions as question, i}
				<div
					class="flex flex-col mb-4 p-3 px-3 rounded-container-token transition border-2 {explained
						? results[i] === true
							? 'border-success-500'
							: 'border-error-500'
						: 'border-transparent'}"
				>
					<p class="p-3 text-xl flex items-center gap-2">
						<span class="font-bold">{i + 1}.</span> <span>{@html renderText(question)}</span>
					</p>
					<div class="flex gap-10 justify-between">
						{#if explained}
							<p class="text-secondary-500 font-bold text-xl ml-5" in:fly>
								{section.answers[i] == 1 ? 'True' : 'False'}!
							</p>
						{/if}
						{#if !explained}
							<p class="text-success-500 font-bold text-xl ml-5 opacity-0" in:fly>
								{section.answers[i] == 1 ? 'True' : 'False'}!
							</p>
						{/if}
						<div class="ml-auto flex gap-5">
							<button
								class="btn text-lg {answered[i] === 1
									? 'variant-filled-success'
									: 'variant-ghost-success'}"
								on:click={() => setAnswer(i, 1)}><span>True</span></button
							>
							<button
								class="btn text-lg {answered[i] === 0
									? 'variant-filled-error'
									: 'variant-ghost-error'}"
								on:click={() => setAnswer(i, 0)}><span>False</span></button
							>
						</div>
					</div>
				</div>
			{/each}
		</main>
	</div>
{/if}
{#if showNextButton && !section.skip && explained && showButton}
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
