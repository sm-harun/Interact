<script lang="ts">
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import LockedCourse from '$lib/components/courses/LockedCourses.svelte';
	import FilterSideBar from '$lib/components/courses/FilterSideBar.svelte';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import { user } from '$lib/stores/credentials';

	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { subject } from '$lib/stores/components';
	import type { DocumentData } from 'firebase/firestore';
	import { getDocs } from 'firebase/firestore';
	import { getCourseColl, getLessonsColl } from '$lib/docRefs';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import LockedCourses from '$lib/components/courses/LockedCourses.svelte';
	import { writable } from 'svelte/store';

	let courses = writable<any[]>([]);
	// This will be used for conparison to check wether filteredCourses is empty
	let emptyArray: any = [];
	// Lets us update UI easily

	onMount(async () => {
		await getCourses().then((fetchedCourses) => {
			fetchedCourses.forEach(async (doc: DocumentData) => {
				let newCourse = {
					title: doc.data().title,
					subjects: doc.data().subjects,
					image: doc.data().image,
					lessons: 0
				};
				if ($user) {
					await getLessonsLength(doc.data().title).then((lessons) => {
						newCourse.lessons = lessons;
					});
				}
				courses.update((currentCourses) => [...currentCourses, newCourse]);
			});
		});
	});

	async function getCourses() {
		let fetchedCourses = await getDocs(getCourseColl());
		return fetchedCourses;
	}

	async function getLessonsLength(courseTitle: string): Promise<number> {
		let fetchedLessons = await getDocs(getLessonsColl(courseTitle));

		return fetchedLessons.size;
	}
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader />

	<main class="flex-grow overflow-hidden flex">
		<FilterSideBar />
		<section
			class="h-full p-5 lg:p-10 overflow-y-scroll flex-grow relative"
			in:fly={{ x: 200, duration: 500, delay: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			{#if JSON.stringify($courses) === JSON.stringify(emptyArray)}
				<ProgressBar
					meter={'bg-primary-500 h-1'}
					track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
					rounded={'rounded-none'}
				/>
			{:else}
				<h1 class="text-4xl">Courses</h1>
				<br />
				<section class="flex flex-wrap gap-10">
					{#each $courses.filter((course) => course.subjects.includes($subject) || $subject == 'All') as course}
						{#if $user}
							<a href="/courses/{course.title}/">
								<CourseCard
									title={course.title}
									subjects={course.subjects}
									image={course.image}
									lessons={course.lessons}
								/>
							</a>
						{:else}
							<LockedCourses title={course.title} image={course.image} />
						{/if}
					{/each}
				</section>
			{/if}
		</section>
	</main>
</div>
