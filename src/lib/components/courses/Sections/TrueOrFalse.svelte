<script lang="ts">
	import { type TrueOrFalseType } from '$lib/stores/courses';
	import { fly, slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { renderText } from '$lib/stores/themes';
	import { onMount } from 'svelte';

	interface Props {
		section: TrueOrFalseType;
		showNextSection: () => void;
		showNextButton: boolean;
	}

	let { section, showNextSection, showNextButton }: Props = $props();

	let show = $state(false);

	let showButton = $state(true);

	let answered: number[] = $state([]);
	let results: boolean[] = [];

	// This will check if the questions have been done
	let explained = $state(false);

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
			class="bg-surface-100-800-token w-full border-transparent p-4 transition border-token rounded-container-token"
			in:fly={{ y: 200, duration: 1000, easing: cubicInOut }}
		>
			<h1 class="h3 mb-4 flex w-full items-center gap-3 p-2 px-3 font-bold">True or False</h1>
			<hr />
			{#each section.questions as question, i}
				<div
					class="mb-4 flex flex-col border-2 p-3 px-3 transition rounded-container-token {explained
						? results[i] === true
							? 'border-success-500'
							: 'border-error-500'
						: 'border-transparent'}"
				>
					<p class="flex items-center gap-2 p-3 text-xl">
						<span class="font-bold">{i + 1}.</span> <span>{@html renderText(question)}</span>
					</p>
					<div class="flex justify-between gap-10">
						{#if explained}
							<p class="ml-5 text-xl font-bold text-secondary-500" in:fly>
								{section.answers[i] == 1 ? 'True' : 'False'}!
							</p>
						{/if}
						{#if !explained}
							<p class="ml-5 text-xl font-bold text-success-500 opacity-0" in:fly>
								{section.answers[i] == 1 ? 'True' : 'False'}!
							</p>
						{/if}
						<div class="ml-auto flex gap-5">
							<button
								class="btn text-lg {answered[i] === 1
									? 'variant-filled-success'
									: 'variant-ghost-success'}"
								onclick={() => setAnswer(i, 1)}><span>True</span></button
							>
							<button
								class="btn text-lg {answered[i] === 0
									? 'variant-filled-error'
									: 'variant-ghost-error'}"
								onclick={() => setAnswer(i, 0)}><span>False</span></button
							>
						</div>
					</div>
				</div>
			{/each}
		</main>
	</div>
{/if}
{#if showNextButton && !section.skip && explained && showButton}
	<div class="mt-5 flex w-full items-center justify-end pb-2">
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
