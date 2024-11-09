<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TestSettings from './TestSettings.svelte';

	import TreeView from '$lib/components/general/treeview/TreeView.svelte';
	import TreeViewChildren from '$lib/components/general/treeview/TreeViewChildren.svelte';
	import { getDocs } from 'firebase/firestore';
	import { getCourseColl, getLessonsColl } from '$lib/docRefs';

	type Course = {
		title: string;
		lessons: string[];
	};

	// let courses = [
	// 	{ title: 'Vectors', lessons: ['Introduction', 'Quit Down', 'Something'] },
	// 	{ title: 'Enzymes', lessons: ['Introduction to En', 'Quit Down', 'Something'] },
	// 	{ title: 'Humans', lessons: ['Humaaane', 'Quit Down', 'Something'] }
	// ];

	let courses: Course[] = [];
	let fetched = $state(false);

	$effect.pre(() => {
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

			fetched = true;
		});
	});
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex overflow-hidden">
		<!-- This is the Content Selection Section -->
		<section class="flex-[3_1_0] flex overflow-hidden">
			<!-- This will display the courses -->
			<div class="flex-[1_1_0] flex flex-col overflow-hidden">
				<header
					class="flex-shrink-0 w-full h-20 bg-surface-100-800-token course-header-shadow flex items-center px-10"
				>
					<h2 class="h2">Courses</h2>
				</header>
				<main class="flex-grow p-5 flex flex-col gap-5 overflow-y-scroll">
					{#if fetched}
						{#each courses as course}
							<TreeView text={course.title}>
								{#each course.lessons as lesson}
									<TreeViewChildren>{lesson}</TreeViewChildren>
								{/each}
							</TreeView>
						{/each}
					{/if}
				</main>
			</div>

			<!-- This will display the Notes -->
			<div class="flex-[1_1_0] border-surface-500 border-l-2 overflow-hidden">
				<header
					class="flex-shrink-0 w-full h-20 bg-surface-100-800-token notes-header-shadow flex items-center px-10"
				>
					<h2 class="h2">Notes</h2>
				</header>
			</div>
		</section>

		<TestSettings />
	</main>
</div>

<style>
	.course-header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
	.notes-header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
</style>
