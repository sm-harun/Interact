<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getLessonsColl } from '$lib/docRefs';
	import { getDocs, query, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import LessonsSideBar from '$lib/components/courses/LessonsSideBar.svelte';

	import {
		sectionsPosition,
		setSectionsPosition,
		setMobSectionsPosition
	} from '$lib/stores/themes.js';

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
			<div class="absolute top-full right-5 grid grid-cols-3 gap-1 2xl:hidden">
				<button
					class="p-3 bg-secondary-200-700-token active:scale-95 duration-100 rounded-bl-container-token"
					on:click={() => {
						setMobSectionsPosition(0);
						setSectionsPosition(0);
					}}
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
							d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
						/>
					</svg>
				</button>
				<button
					class="p-3 bg-secondary-200-700-token active:scale-95 duration-100"
					on:click={() => {
						setSectionsPosition(0);
						setMobSectionsPosition(100);
					}}
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
				</button>
				<button
					class="p-3 bg-secondary-200-700-token active:scale-95 duration-100 rounded-br-container-token"
					on:click={() => {
						setSectionsPosition(100);
						setMobSectionsPosition(100);
					}}
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
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
						/>
					</svg>
				</button>
			</div>
		{:else}
			<h1 class="text-3xl font-bold text-primary-500-400-token px-5">Welcome</h1>
		{/if}
		<div class="ml-auto logo-cloud grid-cols-2 gap-1 hidden 2xl:grid">
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

	<main class="flex-grow flex overflow-hidden">
		{#key updater}
			<div class=" hidden lg:block">
				<LessonsSideBar {lessons} {updateLessons} course={data.params.course} />
			</div>
		{/key}

		<div class="flex-grow h-full overflow-hidden">
			{#key lessonUpdater}
				<slot />
			{/key}
		</div>
	</main>
</main>
