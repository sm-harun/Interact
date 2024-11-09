<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TestSettings from './TestSettings.svelte';

	import TreeView from '$lib/components/general/treeview/TreeView.svelte';
	import TreeViewChildren from '$lib/components/general/treeview/TreeViewChildren.svelte';
	import { getDocs } from 'firebase/firestore';
	import { getCollNotesColl, getCourseColl, getLessonsColl, getNotesColl } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';

	type Course = {
		title: string;
		lessons: string[];
	};

	type Note = {
		title: string;
		notes: string[];
	};

	let courses: Course[] = $state([]);
	let couresNotesColls: Note[] = $state([]);
	let personalNotesColls: Note[] = $state([]);

	$effect.pre(() => {
		// This makes sure we have a user to fetches user's notes
		if ($user) {
			// Fetches all the courses and the lessons inside those courses
			getDocs(getCourseColl()).then((fetchedCourses) => {
				fetchedCourses.forEach((course) => {
					let newCourse: Course = {
						title: course.data().title,
						lessons: []
					};

					getDocs(getLessonsColl(course.data().title)).then((lessons) => {
						lessons.forEach((lesson) => newCourse.lessons.push(lesson.data().title));
					});

					courses.push(newCourse);
				});
			});

			// Fetches all Notes collections and notes inside them
			getDocs(getNotesColl($user?.uid)).then((fetchedNotes) => {
				fetchedNotes.forEach((noteColl) => {
					let newNote: Note = {
						title: noteColl.data().title,
						notes: []
					};

					getDocs(getCollNotesColl($user?.uid, noteColl.data().title)).then((notes) => {
						notes.forEach((note) => newNote.notes.push(note.data().title));
					});

					// Pushs them to a separate array based on type of note
					if (noteColl.data().type == 'course') couresNotesColls.push(newNote);
					if (noteColl.data().type == 'personal') personalNotesColls.push(newNote);
				});
			});
		}
	});
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
						<TreeView text={course.title}>
							{#each course.lessons as lesson}
								<TreeViewChildren>{lesson}</TreeViewChildren>
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
						<TreeView text={noteColl.title}>
							{#each noteColl.notes as note}
								<TreeViewChildren>{note}</TreeViewChildren>
							{/each}
						</TreeView>
					{/each}
					<h2 class="h2 mt-10">Personal Notes</h2>
					{#each personalNotesColls as noteColl}
						<TreeView text={noteColl.title}>
							{#each noteColl.notes as note}
								<TreeViewChildren>{note}</TreeViewChildren>
							{/each}
						</TreeView>
					{/each}
				</main>
			</div>
		</section>

		<TestSettings />
	</main>
</div>
