<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getLessonsColl } from '$lib/docRefs';
	import { getDocs, query, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import LessonsSideBar from '$lib/components/courses/LessonsSideBar.svelte';

	import { sectionsPosition, setSectionsPosition } from '$lib/stores/themes.js';

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
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">{data.params.lesson}</h1>
		{:else}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">Welcome</h1>
		{/if}
		<div class="ml-auto logo-cloud grid-cols-2 gap-1">
			<button
				class="flex-1 {$sectionsPosition == 0
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} transition rounded-tl-container-token rounded-bl-container-token text-xl p-3 px-6 active:scale-95 flex gap-3 items-center justify-center"
				on:click={() => setSectionsPosition(0)}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
					/>
				</svg>
				<span>AI</span></button
			>
			<button
				class="flex-1 {$sectionsPosition == 100
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} transition rounded-tr-container-token rounded-br-container-token text-xl p-3 px-6 active:scale-95 flex gap-3 items-center justify-center"
				on:click={() => setSectionsPosition(100)}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>

				<span>Notes</span></button
			>
		</div>
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
