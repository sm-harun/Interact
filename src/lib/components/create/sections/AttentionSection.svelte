<script lang="ts">
	import { run } from 'svelte/legacy';

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

	interface Props {
		section: BasicSection;
		course: string;
		lesson: string;
	}

	let { section, course, lesson }: Props = $props();

	let sectionTitle = $state(section.title);
	let sectionSkip = $state(section.skip);

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	let buttonSynced = $state(true);

	let oldTitle: string = $state();
	let oldSkip: boolean = $state();

	onMount(() => {
		oldTitle = sectionTitle;
		oldSkip = sectionSkip;
	});

	function checkIfChanged(nTitle: string, oTitle: string, nSkip: boolean, oSkip: boolean) {
		if (nTitle !== oTitle || nSkip !== oSkip) {
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
			title: sectionTitle,
			skip: sectionSkip
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

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

	function resetChanges() {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: 'Are you sure you want to Reset the changes?',
			body: 'This will reset to the last synced state.',
			valueAttr: { type: 'text', minlength: 3, maxlength: 30, required: true },
			response: async (r: string) => {
				if (!r) return;

				sectionTitle = oldTitle;
				sectionSkip = oldSkip;
			}
		};
		modalStore.trigger(modalSettings);
	}
	// Check if we are in sync when an input value changes
	run(() => {
		checkIfChanged(sectionTitle, oldTitle, sectionSkip, oldSkip);
	});
</script>

<div class="bg-surface-300-600-token w-full p-4 rounded-container-token">
	<h1 class="h3">Attention</h1>
	<blockquote class="blockquote mt-5">
		<input class="input font-bold" type="text" placeholder="Title" bind:value={sectionTitle} />
	</blockquote>
	<div class="mt-5 flex w-full justify-between">
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
