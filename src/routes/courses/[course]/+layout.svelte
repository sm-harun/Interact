<script lang="ts">
	import { getLessonsColl } from '$lib/docRefs';
	import { getDocs, query, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { lessonsUpdater, updateLessons } from '$lib/stores/themes.js';

	import { sectionsPosition, mobSectionsPosition } from '$lib/stores/themes.js';

	import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';

	import AIChat from '$lib/components/courses/workingSpaces/AIChat.svelte';
	import Notes from '$lib/components/courses/workingSpaces/Notes.svelte';
	import Calculator from '$lib/components/courses/workingSpaces/Calculator.svelte';
	import LessonsArea from '$lib/components/courses/LessonsArea.svelte';

	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import LessonsSideBar from '$lib/components/courses/LessonsSideBar.svelte';
	import LargeScreenSectionButtons from '$lib/components/courses/workingSpaces/LargeScreenSectionButtons.svelte';
	import SmallScreenSectionButtons from '$lib/components/courses/workingSpaces/SmallScreensSectionButton.svelte';

	import type { Lesson } from '$lib/stores/courses.js';
	import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

	export let data;

	let drawerStore = getDrawerStore();

	let lessons: Lesson[] = [];
	let updater = 0;

	onMount(async () => {
		await getLessons().then((fetchedLessons) => {
			fetchedLessons.forEach((doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
				lessons.push(doc.data());
			});
			updater++;
		});
	});

	async function getLessons() {
		let fetchedLessons = await getDocs(
			query(getLessonsColl(data.params.course), orderBy('index', 'asc'))
		);
		return fetchedLessons;
	}
</script>

<Drawer width={'w-auto'} padding={'pt-7 pb-7'}>
	<LessonsSideBar {lessons} {updateLessons} course={data.params.course} />
</Drawer>

<main class="flex flex-col w-screen h-screen">
	<MainHeader
		title={data.params.course}
		showMainRoutes={false}
		showBackButton={true}
		showHomeButton={true}
	/>
	<hr />
	<header
		class="flex-shrink-0 variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 pr-5 flex items-center justify-start gap-2 z-30"
	>
		<button class="btn-icon block lg:hidden" on:click={() => drawerStore.open()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-7"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
				/>
			</svg>
		</button>
		{#if data.params.lesson !== undefined}
			<h1 class="text-3xl font-bold text-primary-800-100-token px-5">{data.params.lesson}</h1>

			<SmallScreenSectionButtons />
			<LargeScreenSectionButtons />
		{:else}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">Welcome</h1>
		{/if}
	</header>

	<main class="flex-grow flex overflow-hidden">
		{#key updater}
			<div class=" hidden lg:block">
				<LessonsSideBar {lessons} {updateLessons} course={data.params.course} />
			</div>
		{/key}

		<div class="flex-grow h-full overflow-hidden">
			<main class="flex h-full relative overflow-hidden">
				<!-- Main lesson -->
				{#if data.params.lesson !== undefined}
					{#key $lessonsUpdater}
						<LessonsArea course={data.params.course} lesson={data.params.lesson} />
					{/key}
				{:else}
					<!-- This will show up as a welcome screen to every course -->
					<main class="size-[80%] self-center mx-auto flex flex-col h1 overflow-hidden">
						<h1 class="flex-1 flex justify-center items-center flex-shrink-0">
							Welcome to the <span class="mx-3 font-bold text-primary-500"
								>{data.params.course}</span
							> Course
						</h1>
						<h3 class="h2 py-5 flex-shrink-0">Lessons in this course:</h3>
						<ul
							class="flex-1 p-8 list-disc list-inside grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 overflow-y-auto"
						>
							{#key updater}
								{#each lessons as lesson}
									<li class="text-lg">{lesson.title}</li>
								{/each}
							{/key}
						</ul>
					</main>
				{/if}

				<!-- These are the three sections -->
				{#if data.params.lesson !== undefined}
					<section
						class="absolute w-full flex-1 2xl:flex-[2_1_0] h-full flex-shrink-0 overflow-hidden 2xl:sticky border-l-[0.05rem] border-l-surface-400"
						style="left: {100 - $mobSectionsPosition}%;"
					>
						<div class="size-full absolute overflow-hidden" style="right: {$sectionsPosition}%">
							<AIChat />
						</div>
						<div
							class="size-full absolute overflow-hidden"
							style="left: {100 - $sectionsPosition}%"
						>
							<Calculator />
						</div>
						<div class="size-full absolute" style="left: {200 - $sectionsPosition}%">
							<Notes />
						</div>
					</section>
				{/if}
			</main>
		</div>
	</main>
</main>
