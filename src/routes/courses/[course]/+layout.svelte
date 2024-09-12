<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getLessonsColl } from '$lib/docRefs';
	import { getDocs, query, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import LessonsSideBar from '$lib/components/courses/LessonsSideBar.svelte';

	import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';

	export let data;

	let drawerStore = getDrawerStore();

	let lessons: any[] = [];
	let updater = 0;
	// Used to update the lessos section
	let lessonUpdater = 0;

	function updateLessons() {
		// We need this to run after the user navigated not immediately
		setTimeout(() => {
			lessonUpdater++;
		}, 50);
	}

	onMount(async () => {
		await getLessons().then((fetchedLessons) => {
			fetchedLessons.forEach((doc) => {
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
		class="flex-shrink-0 variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 flex items-center justify-start gap-2 z-30"
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
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">{data.params.lesson}</h1>
		{:else}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">Welcome</h1>
		{/if}
	</header>

	<main class="flex-grow flex">
		{#key updater}
			<div class=" hidden lg:block">
				<LessonsSideBar {lessons} {updateLessons} course={data.params.course} />
			</div>
		{/key}

		<div class="flex-grow h-full">
			{#key lessonUpdater}
				<slot />
			{/key}
		</div>
	</main>
</main>
