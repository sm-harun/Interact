<script lang="ts">
	import { getSectionsDoc, renameDocument } from '$lib/docRefs';
	import type { TrueOrFalseType } from '$lib/stores/courses';
	import {
		getModalStore,
		getToastStore,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	export let section: TrueOrFalseType;
	export let course: string;
	export let lesson: string;

	let toastStore = getToastStore();
	let modalStore = getModalStore();

	let sectionTitle = section.title;
	let sectionSkip = section.skip;
	let sectionQuestions = writable(section.questions);
	let sectionAnswers = writable(section.answers);

	let oldTitle: string;
	let oldSkip: boolean;
	let oldQuestions: string[];
	let oldAnswers: number[];

	let buttonSynced = true;

	onMount(() => {
		oldTitle = sectionTitle;
		oldSkip = sectionSkip;
		oldQuestions = [...$sectionQuestions];
		oldAnswers = [...$sectionAnswers];
	});

	$: buttonSynced = checkIfChanged(
		sectionTitle,
		oldTitle,
		$sectionQuestions,
		oldQuestions,
		$sectionAnswers,
		oldAnswers,
		sectionSkip,
		oldSkip
	);

	// This is used to campare arrays cause normal '==' won't work
	const compareArrays = (a: (string | number)[], b: (string | number)[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	function checkIfChanged(
		nTitle: string,
		oTitle: string,
		nQuesitons: string[],
		oQuestions: string[],
		nAnswers: number[],
		oldAnswers: number[],
		nSkip: boolean,
		oSkip: boolean
	) {
		if (
			nTitle !== oTitle ||
			compareArrays(nQuesitons, oQuestions) ||
			compareArrays(filterNull(nAnswers), filterNull(oldAnswers)) ||
			oSkip !== nSkip
		) {
			return false;
		} else {
			return true;
		}
	}

	function filterNull(arr: any[]): any[] {
		return arr.filter((element) => element !== null || element !== undefined);
	}

	function addQuestion() {
		sectionQuestions.update((currentChoices) => {
			let newChoices = [...currentChoices, ''];
			return newChoices;
		});
		sectionAnswers.update((currentChoices) => {
			let newChoices = [...currentChoices, ''];
			return newChoices;
		});
	}

	function deleteQuestion(index: number) {
		sectionQuestions.update((currentChoices: string[]) => {
			let newChoices = currentChoices;
			newChoices.splice(index, 1);
			return newChoices;
		});
		sectionAnswers.update((currentChoices: string[]) => {
			let newChoices = currentChoices;
			newChoices.splice(index, 1);
			return newChoices;
		});
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, oldTitle), {
			title: sectionTitle,
			skip: sectionSkip,
			questions: $sectionQuestions,
			answers: $sectionAnswers
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

				// The information is synced so we also sync the variables
				oldTitle = sectionTitle;
				oldSkip = sectionSkip;
				oldQuestions = [...$sectionQuestions];
				oldAnswers = [...$sectionAnswers];

				// Success Toast
				const toastSettings: ToastSettings = {
					message: `Syncing successful`,
					background: `variant-filled-success`,
					hideDismiss: true,
					timeout: 3000
				};
				toastStore.trigger(toastSettings);
			})
			.catch((error) => {
				const syncError: ToastSettings = {
					message: `Sync Failed: ${error.message}`,
					background: `variant-filled-error`,
					hideDismiss: true,
					timeout: 6000
				};
				toastStore.trigger(syncError);
			});
	}

	function resetChanges() {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: 'Are you sure you want to RESET the changes?',
			body: 'This will reset to the last synced state.',
			response: async (r: string) => {
				if (!r) return;

				sectionTitle = oldTitle;
				sectionSkip = oldSkip;
				sectionQuestions.set([...oldQuestions]);
				sectionAnswers.set([...oldAnswers]);
			}
		};
		modalStore.trigger(modalSettings);
	}

	function changeAnswer(answer: number, i: number) {
		sectionAnswers.update((currentChoices) => {
			currentChoices[i] = answer;
			return currentChoices;
		});
	}

	function changeSkip() {
		sectionSkip = !sectionSkip;
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4 relative">
	<h1 class="h3 mb-5">True or False</h1>
	{#each $sectionQuestions as question, i}
		<div class="flex items-center gap-4 lg:px-5 mb-3" transition:slide>
			<input
				class="input variant-filled-surface"
				type="text"
				placeholder="question {i + 1}"
				bind:value={question}
			/>
			<button
				class="btn-icon border-2 border-success-500 {$sectionAnswers[i] == 1
					? 'bg-success-500'
					: ''}"
				on:click={() => changeAnswer(1, i)}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
				</svg>
			</button>
			<button
				class="btn-icon border-2 border-error-500 {$sectionAnswers[i] == 0 ? 'bg-error-500' : ''}"
				on:click={() => changeAnswer(0, i)}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
			<button class="ml-5" on:click={() => deleteQuestion(i)}>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-8 active:scale-110 transition"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
					/>
				</svg>
			</button>
		</div>
	{/each}
	<div class="w-full flex items-center justify-between mt-5">
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			on:click={resetChanges}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
				/>
			</svg>

			<span class="hidden lg:flex">Reset</span>
		</button>
		<button class="btn variant-ringed-primary hover:variant-filled-primary" on:click={addQuestion}>
			<span>Add Question</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			on:click={syncSection}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
				/>
			</svg>
			<span class="hidden lg:flex">Sync</span>
		</button>
	</div>
</div>
<div class="w-full flex justify-end">
	<button
		class="{!sectionSkip ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
		on:click={changeSkip}
	>
		<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
			/>
		</svg>
		<span>Skip</span>
	</button>
</div>
