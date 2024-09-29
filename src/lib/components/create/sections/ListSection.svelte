<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';

	import { updateDoc } from 'firebase/firestore';
	import { getSectionsDoc, renameDocument } from '$lib/docRefs';
	import {
		getToastStore,
		type ToastSettings,
		getModalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	import { type ListSectionType } from '$lib/stores/courses';

	export let section: ListSectionType;
	export let course: string;
	export let lesson: string;

	let sectionTitle = section.title;
	let sectionList = writable(section.list);
	let sectionSkip = section.skip;

	let toastStore = getToastStore();
	let modalStore = getModalStore();

	let buttonSynced = true;

	let oldTitle: string;
	let oldList: string[];
	let oldSkip: boolean;

	onMount(() => {
		oldTitle = sectionTitle;
		oldList = [...$sectionList];
		oldSkip = sectionSkip;
	});

	$: buttonSynced = checkIfChanged(
		sectionTitle,
		oldTitle,
		$sectionList,
		oldList,
		sectionSkip,
		oldSkip
	);

	// This is used to campare arrays cause normal '==' won't work
	const compareArrays = (a: string[], b: string[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	function checkIfChanged(
		newTitle: string,
		oTitle: string,
		newList: string[],
		oList: string[],
		newSkip: boolean,
		oSkip: boolean
	) {
		if (newTitle !== oTitle || compareArrays(newList, oList) || newSkip !== oSkip) {
			return false;
		} else {
			return true;
		}
	}

	function addList() {
		sectionList.update((currentList) => [...currentList, '']);
	}

	function deleteList(index: number) {
		sectionList.update((currentList: string[]) => {
			let newList = currentList;
			newList.splice(index, 1);
			return newList;
		});
	}

	function changeSkip() {
		sectionSkip = !sectionSkip;
	}

	function syncChanges() {
		updateDoc(getSectionsDoc(course, lesson, oldTitle), {
			title: sectionTitle,
			list: $sectionList,
			skip: sectionSkip
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== sectionTitle) {
					renameDocument(getSectionsDoc(course, lesson, oldTitle), sectionTitle);
				}

				// The information is synced so we also sync the variables
				oldTitle = sectionTitle;
				oldSkip = sectionSkip;
				oldList = [...$sectionList];

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
				sectionList.set([...oldList]);
				sectionSkip = oldSkip;
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4 relative">
	<input
		class="input variant-filled-surface font-bold text-2xl"
		type="text"
		placeholder="Question"
		bind:value={sectionTitle}
	/>
	<ul class="flex flex-col gap-3 mt-3 p-3">
		{#each $sectionList as list, i}
			<li class="text-xl flex gap-2 items-center" transition:slide>
				<span>{i + 1}. </span>
				<input
					class="input variant-filled-surface font-bold text-xl px-4"
					type="text"
					bind:value={list}
				/>
				<button on:click={() => deleteList(i)}>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 mr-2 active:scale-110 transition"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</li>
		{/each}
	</ul>
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
		<button class="btn variant-ringed-primary hover:variant-filled-primary" on:click={addList}>
			<span>Add List</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			on:click={syncChanges}
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
