<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import NotesCard from '$lib/components/notes/cards/NoteCard.svelte';
	import NotesCardPlaceHolder from '$lib/components/notes/placeHolders/NoteCardPlaceHolder.svelte';

	import PlaceHoldersCollection from '$lib/components/notes/placeHolders/PlaceHoldersCollection.svelte';

	import CourseNotesSection from '$lib/components/notes/sections/CourseNotesSection.svelte';
	import PersonalNotesSection from '$lib/components/notes/sections/PersonalNotesSection.svelte';
	import NoteInputSection from '$lib/components/notes/sections/NoteInputSection.svelte';

	import { getNotesDoc, getNotesColl, getCollNotesColl, getCollNotesNote } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';

	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import { setDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore';

	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	let courseNotesCollection = writable([]);
	let personalNotesCollection = writable([]);

	let displayedNotes = writable([]);

	let inputTitle: string = $state();
	let textArea: string = $state();

	let oldTextArea: string = $state();

	let fetchedCollections = $state(false);
	let fetchedNotes = $state(false);

	// This is used to move the sections
	let right = tweened(0, {
		duration: 1000,
		easing: cubicInOut
	});

	onMount(async () => {
		await getCollections().then(({ personalNotes, courseNotes }) => {
			personalNotesCollection.set([...personalNotes]);
			courseNotesCollection.set([...courseNotes]);

			fetchedCollections = true;
		});
	});

	function addNewCollection() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide the Name for your Collection',
			valueAttr: { type: 'text', minlength: 3, maxlength: 35, required: true },
			response: (r: string) => {
				if (r) {
					let newCollection = {
						title: r,
						type: 'personal'
					};
					setDoc(getNotesDoc($user?.uid, r), newCollection);

					personalNotesCollection.update((currentValue) => [...currentValue, newCollection]);
				}
			}
		};
		modalStore.trigger(modalSettings);
	}

	type PersonalNotes = {
		type: 'personal';
		title: string;
	};

	type CourseNotes = {
		type: 'course';
		title: string;
	};

	async function getCollections() {
		const fetchedCourses = await getDocs(getNotesColl($user?.uid));

		let personalNotes: PersonalNotes[] = [];
		let courseNotes: CourseNotes[] = [];

		fetchedCourses.forEach(async (note: any) => {
			let newCollection = {
				type: note.data().type,
				title: note.data().title
			};

			if (newCollection.type == 'personal') personalNotes.push(newCollection);
			if (newCollection.type == 'course') courseNotes.push(newCollection);
		});

		return { personalNotes: personalNotes, courseNotes: courseNotes };
	}

	function transitionPlane() {
		if ($right == 0) right.set(100);
		if ($right == 100) right.set(0);
	}

	// This keeps track of which collection we are currently viewing
	let currentCollection: string | null = $state(null);

	let notesUpdater = 0;

	async function updateNotes(collection: string) {
		currentCollection = collection;
		transitionPlane();
		updateNotesUI();

		await getNotesCollection().then((notes) => {
			displayedNotes.set([...notes]);
			fetchedNotes = true;
		});
	}

	function updateNotesUI() {
		notesUpdater++;
	}

	async function getNotesCollection() {
		const fetchedNotes = await getDocs(
			query(getCollNotesColl($user?.uid, currentCollection), orderBy('index', 'asc'))
		);

		let pushedNotes: PersonalNotes[] = [];

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
					setDoc(getCollNotesNote($user?.uid, currentCollection, r), newNote);

					displayedNotes.update((currentValue) => [...currentValue, newNote]);
				}
			}
		};
		modalStore.trigger(modalSettings);
	}

	function loadNote(title: string) {
		$displayedNotes.forEach((note) => {
			if (note.title == title) {
				inputTitle = note.title;
				textArea = note.text;

				oldTextArea = textArea;
			}
		});
	}

	function saveNote() {
		updateDoc(getCollNotesNote($user?.uid, currentCollection, inputTitle), {
			text: textArea
		})
			.then(() => {
				displayedNotes.update((currentValue) => {
					currentValue.forEach((note) => {
						if (note.title == inputTitle) note.text = textArea;
					});

					return currentValue;
				});

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
				textArea = oldTextArea;
			}
		};

		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow flex overflow-hidden flex-col xl:flex-row"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<div class="flex-[1_1_0] xl:flex-1 h-full overflow-hidden relative">
			<!-- This is the section that displays all the notes collection -->
			<div class="size-full p-6 pt-10 absolute overflow-y-auto" style="right: {$right}%;">
				{#if !fetchedCollections}
					<!-- Course Section Place Holder -->
					<PlaceHoldersCollection />
				{:else}
					<CourseNotesSection {courseNotesCollection} {updateNotes} />
					<PersonalNotesSection {personalNotesCollection} {updateNotes} {addNewCollection} />
				{/if}
			</div>

			<!-- This is the section that slides in displays notes on the selected collection -->
			<div class="size-full flex flex-col overflow-y-auto absolute" style="left: {100 - $right}%">
				<!-- This is the header -->
				<header class="p-5 px-5 flex-shrink-0 w-full flex items-center gap-6">
					<button
						aria-labelledby="button"
						class="active:scale-90 transition"
						onclick={transitionPlane}
					>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-9 mr-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
							/>
						</svg>
					</button>
					<h1 class="h1">{currentCollection}</h1>
				</header>
				<hr class="mx-5" />

				<!-- These are the notes found inside a collection -->
				<div class="w-full flex-grow flex flex-wrap content-start gap-6 p-5">
					{#if !fetchedNotes}
						<NotesCardPlaceHolder />
						<NotesCardPlaceHolder />
						<NotesCardPlaceHolder />
					{:else}
						{#each $displayedNotes as note}
							<NotesCard title={note.title} text={note.text} index={note.index} {loadNote} />
						{/each}
						<button
							class="card card-hover size-60 flex justify-center items-center gap-5 p-4"
							onclick={addNewNote}
							aria-label="Add Notes"
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
					{/if}
				</div>
			</div>
		</div>
		<NoteInputSection
			bind:inputTitle
			bind:textArea
			bind:oldTextArea
			bind:currentCollection
			{resetNote}
			{saveNote}
		/>
	</main>
</div>
