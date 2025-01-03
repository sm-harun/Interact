<script lang="ts">
	import { getDocs, setDoc, updateDoc, query, orderBy } from 'firebase/firestore';
	import { getCollNotesColl, getCollNotesNote, getNotesDoc, renameDocument } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import NoteCard from '$lib/components/notes/cards/NoteCard.svelte';
	import NoteCardPlaceHolder from '$lib/components/notes/placeHolders/NoteCardPlaceHolder.svelte';

	interface Props {
		course: string;
	}

	let { course }: Props = $props();

	let inputTitle: string | undefined = $state();
	let textArea: string | undefined = $state();

	let oldTitle: string | undefined = $state();
	let oldTextArea: string | undefined = $state();

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	let displayedNotes = writable([]);
	let fetchSuccefull = $state(false);

	let notesUpdater = $state(0);
	let updateNotes = () => (notesUpdater = notesUpdater + 1);

	let right = tweened(0, {
		duration: 1000,
		easing: cubicInOut
	});

	$effect.pre(async () => {
		if ($user) {
			await getNotesCollection($user.uid).then((notes) => {
				displayedNotes.set([...notes]);
				fetchSuccefull = true;
				updateNotes();
			});
		}
	});

	async function getNotesCollection(userId: string) {
		const fetchedNotes = await getDocs(
			query(getCollNotesColl(userId, course), orderBy('index', 'asc'))
		);
		let pushedNotes: any[] = [];

		fetchedNotes.forEach(async (note: any) => {
			let newNote = {
				title: note.data().title,
				text: note.data().text,
				index: note.data().index
			};

			pushedNotes.push(newNote);
		});

		return pushedNotes;
	}

	function addNewNote() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide the title for your Note',
			valueAttr: { type: 'text', minlength: 3, maxlength: 35, required: true },
			response: (r: string) => {
				if (r) {
					let newNote = {
						title: r,
						text: '',
						index: $displayedNotes.length
					};

					if ($displayedNotes.length == 0) {
						setDoc(getNotesDoc($user?.uid, course), { title: course, type: 'course' });
					}

					setDoc(getCollNotesNote($user?.uid, course, r), newNote);

					displayedNotes.update((currentValue) => [...currentValue, newNote]);
				}
			}
		};
		modalStore.trigger(modalSettings);
	}

	function viewNote(title: string) {
		right.set(100);

		$displayedNotes.forEach((note) => {
			if (note.title == title) {
				inputTitle = note.title;
				textArea = note.text;

				oldTitle = inputTitle;
				oldTextArea = textArea;
			}
		});
	}

	function goBack() {
		right.set(0);
	}

	function saveNote() {
		updateDoc(getCollNotesNote($user?.uid, course, oldTitle), {
			title: inputTitle,
			text: textArea
		})
			.then(() => {
				// Changes the name of the actual document
				if (oldTitle !== inputTitle) {
					renameDocument(getCollNotesNote($user?.uid, course, oldTitle), inputTitle);
				}

				displayedNotes.update((currentValue) => {
					currentValue.forEach((note) => {
						if (note.title == inputTitle) note.text = textArea;
					});

					return currentValue;
				});

				oldTitle = inputTitle;
				oldTextArea = textArea;

				const toastSettings: ToastSettings = {
					message: `Saved the ${inputTitle} Note`,
					background: `variant-filled-success`,
					hideDismiss: true,
					timeout: 3000
				};

				toastStore.trigger(toastSettings);
			})
			.catch((error) => {
				const updateFail: ToastSettings = {
					message: `Update failed: ${error.message}`,
					background: `variant-filled-error`,
					hideDismiss: true,
					timeout: 6000
				};
				toastStore.trigger(updateFail);
			});
	}

	function resetNote() {
		const modalSettings: ModalSettings = {
			type: 'confirm',
			title: 'Are you sure you want to reset?',
			valueAttr: { type: 'text', minlength: 3, maxlength: 35, required: true },
			response: (r: string) => {
				if (!r) return;
				inputTitle = oldTitle;
				textArea = oldTextArea;
			}
		};

		modalStore.trigger(modalSettings);
	}
</script>

<main>
	<div
		class="absolute top-0 flex size-full flex-wrap content-start gap-5 overflow-y-auto p-5"
		style="right: {$right}%"
	>
		{#key notesUpdater}
			{#if fetchSuccefull}
				{#each $displayedNotes as note}
					<NoteCard title={note.title} text={note.text} index={note.index} loadNote={viewNote} />
				{/each}
				<button
					class="card card-hover flex size-60 items-center justify-center gap-5 p-4"
					onclick={addNewNote}
					aria-label="Add a new note"
				>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-[60%]"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			{:else}
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
				<NoteCardPlaceHolder />
			{/if}
		{/key}
	</div>
	<div class="absolute top-0 flex size-full flex-col" style="left: {100 - $right}%">
		<header class="flex h-16 w-full flex-shrink-0 items-center px-5">
			<button class="transition active:scale-90" onclick={goBack} aria-label="Go Back">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="mr-6 size-9"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
					/>
				</svg>
			</button>
		</header>

		<!-- This displays the editable notes -->
		<div class="flex w-full flex-grow flex-col">
			<input
				class="input h1 h-40 flex-shrink-0 rounded-none border-none !bg-transparent px-10"
				bind:value={inputTitle}
			/>
			<hr class="mx-4 mb-8" />
			<textarea
				class="textarea flex-grow border-none !bg-transparent p-5 px-5 text-xl"
				bind:value={textArea}
			></textarea>

			<div class="absolute bottom-10 right-8 flex gap-5">
				<button
					class="{oldTextArea == textArea && oldTitle == inputTitle
						? 'variant-ghost-primary'
						: 'variant-filled-primary'} btn px-6 text-xl"
					onclick={resetNote}>Reset</button
				>
				<button
					class="{oldTextArea == textArea && oldTitle == inputTitle
						? 'variant-ghost-primary'
						: 'variant-filled-primary'} btn px-6 text-xl"
					onclick={saveNote}>Save</button
				>
			</div>
		</div>
	</div>
</main>
