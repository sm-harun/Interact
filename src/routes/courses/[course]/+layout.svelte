<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getLessonsColl } from '$lib/docRefs';
	import { getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let data;

	let lessons: any[] = [];
	let emptyArray: any[] = [];
	let updater = 0;
	// Used to update the lessos section
	let lessonUpdater = 0;

	function updateLessons() {
		lessonUpdater++;
	}

	onMount(async () => {
		await getLessons().then((fetchedLessons) => {
			fetchedLessons.forEach((doc) => {
				lessons.push(doc.data());
			});
			updater++;
		});
		// lessons = [
		// 	{
		// 		title: 'Introduction to Vectors'
		// 	},
		// 	{
		// 		title: 'A recap to Scalars'
		// 	},
		// 	{
		// 		title: 'More into Scalars'
		// 	}
		// ];
	});

	async function getLessons() {
		let fetchedLessons = await getDocs(getLessonsColl(data.params.course));
		return fetchedLessons;
	}
</script>

<main class="flex flex-col w-screen h-screen">
	<MainHeader title={data.params.course} showMainRoutes={false} />
	<hr />
	<header
		class="flex-shrink-0 variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 flex items-center justify-between z-40"
	>
		{#if data.params.lesson !== undefined}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">{data.params.lesson}</h1>
		{:else}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">Welcome</h1>
		{/if}
	</header>

	<main class="flex-grow flex">
		<nav class="w-80 bg-surface-200-700-token h-full bg-red-500 flex-shrink-0 relative">
			{#key updater}
				{#if JSON.stringify(lessons) === JSON.stringify(emptyArray)}
					<ProgressBar
						meter={'bg-primary-500 h-1'}
						track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
						rounded={'rounded-none'}
					/>
				{:else}
					<h2 class="h2 w-full grid place-items-center p-4">Lessons</h2>
					{#each lessons as lesson, i}
						<a
							href="/courses/{data.params.course}/{lesson.title}"
							class="{$page.params.lesson === lesson.title
								? 'border-b-2 border-primary-500'
								: ''} w-full h-14 flex items-center pl-4 hover:backdrop-brightness-150"
							on:click={updateLessons}>{i + 1}. {lesson.title}</a
						>
						<hr />
					{/each}
				{/if}
			{/key}
		</nav>

		<div class="flex-grow h-full">
			{#key lessonUpdater}
				<slot />
			{/key}
		</div>
	</main>
</main>
