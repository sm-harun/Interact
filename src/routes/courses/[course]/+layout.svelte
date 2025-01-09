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

	let { data } = $props();

	let drawerStore = getDrawerStore();

	let lessons: Lesson[] = [];
	let updater = $state(0);

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

<main class="flex h-screen w-screen flex-col">
	<MainHeader
		title={data.params.course}
		showMainRoutes={false}
		showBackButton={true}
		showHomeButton={true}
	/>
	<hr />
	<header
		class="header-shadow bg-surface-100-800-token sticky top-1 z-30 flex h-20 w-screen flex-shrink-0 items-center justify-start gap-2 p-9 px-3 pr-5"
	>
		<button
			class="btn-icon block lg:hidden"
			aria-label="Opens Drawer"
			onclick={() => drawerStore.open()}
		>
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
			<h1 class="text-primary-800-100-token truncate px-5 text-3xl font-bold">
				{data.params.lesson}
			</h1>

			<SmallScreenSectionButtons />
			<LargeScreenSectionButtons />
		{:else}
			<h1 class="text-primary-500-400-token px-5 text-3xl font-bold">Welcome</h1>
		{/if}
	</header>

	<main class="flex flex-grow overflow-hidden">
		{#key updater}
			<div class=" hidden lg:block">
				<LessonsSideBar {lessons} {updateLessons} course={data.params.course} />
			</div>
		{/key}

		<div class="h-full flex-grow overflow-hidden">
			<main class="relative flex h-full overflow-hidden">
				<!-- Main lesson -->
				{#if data.params.lesson !== undefined}
					{#key $lessonsUpdater}
						<LessonsArea course={data.params.course} lesson={data.params.lesson} />
					{/key}
				{:else}
					<!-- This will show up as a welcome screen to every course -->
					<main class="h1 mx-auto flex size-[80%] flex-col self-center overflow-hidden">
						<h1 class="flex flex-1 flex-shrink-0 items-center text-5xl font-bold text-primary-500">
							{data.params.course}
						</h1>
						<h3 class="h2 flex-shrink-0 py-5">Lessons in this course:</h3>
						<ul
							class="grid flex-1 list-inside list-disc grid-cols-1 gap-5 overflow-y-auto p-8 xl:grid-cols-2 2xl:grid-cols-3"
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
						class="absolute h-full w-full flex-1 flex-shrink-0 overflow-hidden border-l-[0.05rem] border-l-surface-400 2xl:sticky 2xl:flex-[2_1_0]"
						style="left: {100 - $mobSectionsPosition}%;"
					>
						<div class="absolute size-full overflow-hidden" style="right: {$sectionsPosition}%">
							<AIChat />
						</div>
						<div
							class="absolute size-full overflow-hidden"
							style="left: {100 - $sectionsPosition}%"
						>
							<Calculator />
						</div>
						<div class="absolute size-full" style="left: {200 - $sectionsPosition}%">
							<Notes course={data.params.course} />
						</div>
					</section>
				{/if}
			</main>
		</div>
	</main>
</main>

<style>
	.header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
</style>
