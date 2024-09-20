<script lang="ts">
	import { getSectionsDoc, renameDocument } from '$lib/docRefs';
	import { updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import {
		getToastStore,
		type ToastSettings,
		getModalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	export let section: ExplainSection;
	export let course: string;
	export let lesson: string;

	let toastStore = getToastStore();
	let modalStore = getModalStore();

	// These will be binded to input values
	let sectionText = section.text;
	let sectionTitle = section.title;
	let sectionSkip = section.skip;

	// Holds the sync state
	let buttonSynced = true;

	// These varables are used to detect whether we are synced or not
	let oldText: string;
	let oldTitle: string;
	let oldSkip: boolean;

	// At initialization they should be in sync
	onMount(() => {
		oldText = sectionText;
		oldTitle = sectionTitle;
		oldSkip = sectionSkip;
	});

	// Check if we are in sync when an input value changes
	$: checkIfChanged(sectionTitle, oldTitle, sectionText, oldText, sectionSkip, oldSkip);

	function checkIfChanged(
		nTitle: string,
		oTitle: string,
		nText: string,
		oText: string,
		oSkip: boolean,
		nSkip: boolean
	) {
		if (nTitle !== oTitle || nText !== oText || oSkip !== nSkip) {
			buttonSynced = false;
		} else {
			buttonSynced = true;
		}
	}

	function changeSkip() {
		sectionSkip = !sectionSkip;
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, oldTitle), {
			text: sectionText,
			title: sectionTitle,
			skip: sectionSkip
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

				oldText = sectionText;
				oldTitle = sectionTitle;
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

	// This reverts back to the last synced state.
	function resetChanges() {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: 'Are you sure you want to Reset the changes?',
			body: 'This will reset to the last synced state.',
			valueAttr: { type: 'text', minlength: 3, maxlength: 30, required: true },
			response: async (r: string) => {
				if (!r) return;

				sectionText = oldText;
				sectionTitle = oldTitle;
				sectionSkip = oldSkip;
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4">
	<label class="label">
		<strong>Title: </strong>
		<input
			class="input variant-filled-surface font-bold text-xl"
			type="text"
			placeholder="Title"
			bind:value={sectionTitle}
		/>

		<strong>Info: </strong>
		<textarea
			class="textarea variant-filled-surface font-semibold text-lg"
			rows="3"
			placeholder="Explanation to the topic..."
			bind:value={sectionText}
		/>
	</label>
	<div class="w-full flex justify-between mt-2">
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
