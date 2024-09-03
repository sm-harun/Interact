<script lang="ts">
	import { getSectionsDoc } from '$lib/docRefs';
	import { updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let section: ExplainSection;
	export let course: string;
	export let lesson: string;

	let toastStore = getToastStore();

	let sectionText: string = section.text;
	let sectionTitle: string = section.title;

	// This will check if we made any changes to update button UI
	let oldText: string;
	onMount(() => (oldText = sectionText));

	let buttonSynced = true;

	$: checkIfChanged(sectionText, oldText);

	function checkIfChanged(newT: string, old: string) {
		if (newT !== old) {
			buttonSynced = false;
		} else {
			buttonSynced = true;
		}
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, section.title), {
			text: sectionText,
			title: sectionTitle
		}).then(() => {
			oldText = sectionText;
			// Success Toast
			const toastSettings: ToastSettings = {
				message: `Syncing successful`,
				background: `variant-filled-success`,
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(toastSettings);
		});
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4">
	<label class="label">
		<strong>Title: </strong>
		<input
			class="input variant-filled-surface font-bold"
			type="text"
			placeholder="Title"
			bind:value={sectionTitle}
		/>

		<strong>Info: </strong>
		<textarea
			class="textarea variant-filled-surface font-semibold"
			rows="3"
			placeholder="Explanation to the topic..."
			bind:value={sectionText}
		/>
	</label>
	<div class="w-full flex justify-end mt-2">
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn ml-auto"
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
