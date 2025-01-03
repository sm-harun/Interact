<script lang="ts">
	import { run } from 'svelte/legacy';

	import { getSectionsDoc, renameDocument } from '$lib/docRefs';
	import type { EquationSectionType } from '$lib/stores/courses';
	import { updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import {
		getModalStore,
		getToastStore,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { writable } from 'svelte/store';

	interface Props {
		section: EquationSectionType;
		course: string;
		lesson: string;
	}

	let { section, course, lesson }: Props = $props();

	let sectionTitle = $state(section.title);
	let sectionEquations = writable(section.equations);
	let sectionSkip = $state(section.skip);

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	let buttonSynced = $state(true);

	let oldTitle: string = $state();
	let oldEquations: string[] = $state();
	let oldSkip: boolean = $state();

	onMount(() => {
		oldTitle = sectionTitle;
		oldEquations = [...$sectionEquations];
		oldSkip = sectionSkip;
	});

	// This is used to campare arrays cause normal '==' won't work
	const compareArrays = (a: string[], b: string[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	function checkIfChanged(
		nTitle: string,
		oTitle: string,
		nEquations: string[],
		oEquations: string[],
		oSkip: boolean,
		nSkip: boolean
	): boolean {
		if (nTitle !== oTitle || compareArrays(nEquations, oEquations) || oSkip !== nSkip) {
			return false;
		} else {
			return true;
		}
	}

	function addChoice(): void {
		sectionEquations.update((currentEquations) => [...currentEquations, '']);
	}

	function deleteChoice(index: number): void {
		sectionEquations.update((currentEquations: string[]) => {
			let newList = currentEquations;
			newList.splice(index, 1);
			return newList;
		});
	}

	function changeSkip() {
		sectionSkip = !sectionSkip;
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, oldTitle), {
			title: sectionTitle,
			equations: $sectionEquations,
			skip: sectionSkip
		})
			.then(async () => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					await renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

				oldTitle = sectionTitle;
				oldEquations = [...$sectionEquations];
				oldSkip = sectionSkip;

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
			title: 'Are you sure you want to Reset the changes?',
			body: 'This will reset to the last synced state.',
			valueAttr: { type: 'text', minlength: 3, maxlength: 30, required: true },
			response: async (r: string) => {
				if (!r) return;

				sectionTitle = oldTitle;
				sectionEquations.set([...oldEquations]);
				sectionSkip = oldSkip;
			}
		};
		modalStore.trigger(modalSettings);
	}
	// Check if we are in sync when an input value changes
	run(() => {
		buttonSynced = checkIfChanged(
			sectionTitle,
			oldTitle,
			$sectionEquations,
			oldEquations,
			sectionSkip,
			oldSkip
		);
	});
</script>

<div class="bg-surface-300-600-token relative w-full p-4 rounded-container-token">
	<input
		class="input mb-8 text-2xl font-bold"
		type="text"
		placeholder="Title"
		bind:value={sectionTitle}
	/>

	{#each $sectionEquations as equation, i}
		<div class="flex gap-3" transition:slide>
			<input
				class="input my-3 font-bold"
				type="text"
				placeholder="Equation {i + 1}"
				bind:value={$sectionEquations[i]}
			/>
			<button aria-label="Close" onclick={() => deleteChoice(i)}>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 transition active:scale-110"
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
	<div class="mt-2 flex w-full justify-between">
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			onclick={resetChanges}
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
		<button class="variant-ringed-primary btn hover:variant-filled-primary" onclick={addChoice}>
			<span>Add Equation</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			onclick={syncSection}
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
<div class="flex w-full justify-end">
	<button
		class="{!sectionSkip ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
		onclick={changeSkip}
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
