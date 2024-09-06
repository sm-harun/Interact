<script lang="ts">
	import CourseCard from '$lib/components/courses/CourseCard.svelte';
	import SideBar from '$lib/components/courses/SideBar.svelte';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	import { fly } from 'svelte/transition';

	import { subject } from '$lib/stores/components';

	export let data: any;

	let filteredCourses;

	$: filteredCourses = data.courses.filter(
		(course: any) => course.subjects.includes($subject) || $subject == 'all'
	);
</script>

<div class="h-screen flex flex-col">
	<MainHeader />

	<main class="flex-grow overflow-auto flex">
		<SideBar />
		<section
			class="h-full p-5 lg:p-10 overflow-y-scroll flex-grow"
			in:fly={{ x: 200, duration: 500, delay: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			<h1 class="text-4xl">Courses</h1>
			<br />
			<section
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-rows-5 gap-8 2xl:gap-1 place-items-center"
			>
				{#each filteredCourses as course}
					<CourseCard
						title={course.title}
						lessons={course.lessons.length}
						subjects={course.subjects}
						image={course.image}
					/>
				{/each}
			</section>
		</section>
	</main>
</div>
