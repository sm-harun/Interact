<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TestSettings from './TestSettings.svelte';

	import TreeView from '$lib/components/general/treeview/TreeView.svelte';
	import TreeViewChildren from '$lib/components/general/treeview/TreeViewChildren.svelte';
	import { getDocs, setDoc } from 'firebase/firestore';
	import {
		getCollNotesColl,
		getCourseColl,
		getLessonsColl,
		getNotesColl,
		getTestsDoc
	} from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';

	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	type Course = {
		title: string;
		lessons: { title: string; course: string; checked: boolean }[];
		checked: boolean;
	};

	type Note = {
		title: string;
		notes: { title: string; collection: string; checked: boolean }[];
		checked: boolean;
	};

	let courses: Course[] = $state([]);
	let couresNotesColls: Note[] = $state([]);
	let personalNotesColls: Note[] = $state([]);

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	type Settings = {
		truefalse: 0 | 1 | 3 | 5 | 8 | 10;
		choices: 0 | 1 | 3 | 5 | 8 | 10;
		pick: 0 | 1 | 3 | 5 | 8 | 10;
		time: 1 | 3 | 5 | 10 | 15 | 30 | 60;
		showInstantAnswers: boolean;
		useCalculator: boolean;
		useAI: boolean;
		promptBeforeStart: boolean;
	};

	let settings: Settings = $state({
		truefalse: 0,
		choices: 0,
		pick: 0,
		time: 10,
		showInstantAnswers: false,
		useCalculator: false,
		useAI: false,
		promptBeforeStart: false
	});

	// Fetches all the courses and the lessons inside those courses
	$effect.pre(() => {
		getDocs(getCourseColl()).then((fetchedCourses) => {
			fetchedCourses.forEach((course) => {
				let newCourse: Course = {
					title: course.data().title,
					lessons: [],
					checked: false
				};

				getDocs(getLessonsColl(course.data().title)).then((lessons) => {
					lessons.forEach((lesson) =>
						newCourse.lessons.push({
							title: lesson.data().title,
							course: course.data().title,
							checked: false
						})
					);
					courses.push(newCourse);
				});
			});
		});
	});

	// Fetches all Notes collections and notes inside them
	$effect.pre(() => {
		// This makes sure we have a user to fetches user's notes
		if ($user) {
			getDocs(getNotesColl($user?.uid)).then((fetchedNotes) => {
				fetchedNotes.forEach((noteColl) => {
					let newNote: Note = {
						title: noteColl.data().title,
						notes: [],
						checked: false
					};

					getDocs(getCollNotesColl($user?.uid, noteColl.data().title)).then((notes) => {
						notes.forEach((note) => {
							newNote.notes.push({
								title: note.data().title,
								collection: noteColl.data().title,
								checked: false
							});
						});

						// Pushs them to a separate array based on type of note
						if (noteColl.data().type == 'course') couresNotesColls.push(newNote);
						if (noteColl.data().type == 'personal') personalNotesColls.push(newNote);
					});
				});
			});
		}
	});

	// Updates the checkboxes logic when a value changes
	// Courses
	$effect(() => {
		courses.forEach((course) => {
			let areAllChecked = true;

			course.lessons.forEach((lesson) => {
				if (lesson.checked === false) {
					areAllChecked = false;
				}
			});

			if (areAllChecked === true) {
				course.checked = true;
			} else {
				course.checked = false;
			}
		});
	});

	// Coures Notes
	$effect(() => {
		couresNotesColls.forEach((noteColl) => {
			let areAllChecked = true;

			noteColl.notes.forEach((note) => {
				if (note.checked === false) {
					areAllChecked = false;
				}
			});

			if (areAllChecked === true) {
				noteColl.checked = true;
			} else {
				noteColl.checked = false;
			}
		});
	});

	// Personal Notes
	$effect(() => {
		personalNotesColls.forEach((noteColl) => {
			if (noteColl.notes.length == 0) return;

			let areAllChecked = true;

			noteColl.notes.forEach((note) => {
				if (note.checked === false) {
					areAllChecked = false;
				}
			});

			if (areAllChecked === true) {
				noteColl.checked = true;
			} else {
				noteColl.checked = false;
			}
		});
	});

	// Changes the checked state of all elements inside the array if we click the array itself
	function changeAllChecks(type: 'course' | 'personalN' | 'courseN', id: string, state: boolean) {
		switch (type) {
			case 'course':
				courses.forEach((course) => {
					if (course.title == id) course.lessons.forEach((lesson) => (lesson.checked = state));
				});
				break;
			case 'personalN':
				personalNotesColls.forEach((noteColl) => {
					if (noteColl.title == id) noteColl.notes.forEach((note) => (note.checked = state));
				});
				break;
			case 'courseN':
				couresNotesColls.forEach((noteColl) => {
					if (noteColl.title == id) noteColl.notes.forEach((note) => (note.checked = state));
				});
				break;
		}
	}

	function filterChecked() {
		// This will hold the final array with all unchecked lessons and courses filtered
		let filteredCourses: { title: string; lessons: string[]; type: 'course' }[] = [];
		let filteredNoteColls: { title: string; notes: string[]; type: 'note' }[] = [];

		courses.forEach((course) => {
			// Grabs the whole course if is is checked already
			if (course.checked == true) {
				filteredCourses.push({
					title: course.title,
					lessons: course.lessons.map((lesson) => lesson.title),
					type: 'course'
				});
			} else {
				// This filters the lessons that are only checked
				let filteredLessons = course.lessons.filter((lesson) => lesson.checked == true);

				// Checks if there are any checked lessons
				if (filteredLessons.length !== 0)
					// Pushes the coures with only the filtered lessons
					filteredCourses.push({
						title: course.title,
						lessons: filteredLessons.map((lesson) => lesson.title),
						type: 'course'
					});
			}
		});

		personalNotesColls.forEach((notesColl) => {
			if (notesColl.checked == true) {
				filteredNoteColls.push({
					title: notesColl.title,
					notes: notesColl.notes.map((note) => note.title),
					type: 'note'
				});
			} else {
				let filteredNotes = notesColl.notes.filter((note) => note.checked == true);

				if (filteredNotes.length !== 0) {
					filteredNoteColls.push({
						title: notesColl.title,
						notes: filteredNotes.map((note) => note.title),
						type: 'note'
					});
				}
			}
		});

		couresNotesColls.forEach((notesColl) => {
			if (notesColl.checked == true) {
				filteredNoteColls.push({
					title: notesColl.title,
					notes: notesColl.notes.map((note) => note.title),
					type: 'note'
				});
			} else {
				let filteredNotes = notesColl.notes.filter((note) => note.checked == true);

				if (filteredNotes.length !== 0) {
					filteredNoteColls.push({
						title: notesColl.title,
						notes: filteredNotes.map((note) => note.title),
						type: 'note'
					});
				}
			}
		});

		return { filteredCourses, filteredNoteColls };
	}

	function createTest() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'What is the name of your test?',
			valueAttr: { type: 'text', minlength: 1, maxlength: 50, required: true },
			response: async (r: string) => {
				// Stops excustion if user canceled
				if (!r) return;

				let newTest = {
					title: r,
					courses: filterChecked().filteredCourses,
					notes: filterChecked().filteredNoteColls,
					settings: settings
				};

				await setDoc(getTestsDoc($user?.uid, r), newTest)
					.then(() => {
						// Success Toast
						const toastSettings: ToastSettings = {
							message: `Created Test Successfully`,
							background: `variant-filled-success`,
							hideDismiss: true,
							timeout: 3000
						};
						toastStore.trigger(toastSettings);
					})
					.catch((error) => {
						console.log('I am error');
						console.log(error);
					});
			}
		};

		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex overflow-hidden">
		<!-- This is the Content Selection Section -->
		<section class="flex-[3_1_0] flex overflow-hidden">
			<div class="flex-[1_1_0] overflow-hidden relative">
				<header
					class="w-full h-20 variant-glass-surface flex items-center px-10 absolute top-0 left-0 z-20"
				>
					<h2 class="h2">Courses</h2>
				</header>

				<!-- This will display the courses -->
				<main class="size-full flex flex-col gap-5 p-5 overflow-y-scroll pt-24">
					{#each courses as course}
						<TreeView
							text={course.title}
							bind:checked={course.checked}
							type={'course'}
							{changeAllChecks}
						>
							{#each course.lessons as lesson}
								<TreeViewChildren bind:checked={lesson.checked}>{lesson.title}</TreeViewChildren>
							{/each}
						</TreeView>
					{/each}
				</main>
			</div>

			<div class="flex-[1_1_0] border-surface-500 border-l-2 overflow-hidden relative">
				<header
					class="w-full h-20 variant-glass-surface flex items-center px-10 absolute top-0 left-0"
				>
					<h2 class="h2">Notes</h2>
				</header>

				<!-- This will display the Notes -->
				<main class="size-full flex flex-col gap-5 p-5 overflow-y-scroll pt-24">
					<h2 class="h2">Course Notes</h2>
					{#each couresNotesColls as noteColl}
						<TreeView
							text={noteColl.title}
							bind:checked={noteColl.checked}
							type={'courseN'}
							{changeAllChecks}
						>
							{#each noteColl.notes as note}
								<TreeViewChildren bind:checked={note.checked}>{note.title}</TreeViewChildren>
							{/each}
						</TreeView>
					{/each}
					<h2 class="h2 mt-10">Personal Notes</h2>
					{#each personalNotesColls as noteColl}
						<TreeView
							text={noteColl.title}
							bind:checked={noteColl.checked}
							type={'personalN'}
							{changeAllChecks}
						>
							{#each noteColl.notes as note}
								<TreeViewChildren bind:checked={note.checked}>{note.title}</TreeViewChildren>
							{/each}
						</TreeView>
					{/each}
				</main>
			</div>
		</section>

		<TestSettings
			{filterChecked}
			{createTest}
			bind:truefalse={settings.truefalse}
			bind:choices={settings.choices}
			bind:pick={settings.pick}
			bind:time={settings.time}
			bind:showAnswerInstantly={settings.showInstantAnswers}
			bind:useCalculator={settings.useCalculator}
			bind:useAI={settings.useAI}
			bind:promptBeforeStart={settings.promptBeforeStart}
		/>
	</main>
</div>
