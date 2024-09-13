<script lang="ts">
	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';

	import { updateDoc } from 'firebase/firestore';
	import { renameDocument, getSectionsDoc } from '$lib/docRefs';
	import type { BasicSection } from '$lib/stores/courses';

	export let section: BasicSection;
	export let course: string;
	export let lesson: string;

	let sectionTitle = section.title;

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	let buttonSynced = true;

	let oldTitle: string;

	onMount(() => (oldTitle = sectionTitle));

	// Check if we are in sync when an input value changes
	$: checkIfChanged(sectionTitle, oldTitle);

	function checkIfChanged(nTitle: string, oTitle: string) {
		if (nTitle !== oTitle) {
			buttonSynced = false;
		} else {
			buttonSynced = true;
		}
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, section.title), {
			title: sectionTitle
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

				oldTitle = sectionTitle;

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
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4">
	<h1 class="h3">Attention</h1>
	<blockquote class="blockquote mt-5">
		<input
			class="input variant-filled-surface font-bold"
			type="text"
			placeholder="Title"
			bind:value={sectionTitle}
		/>
	</blockquote>
</div>

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
