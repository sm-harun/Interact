<script lang="ts">
	import { getModalStore, type ModalSettings, ProgressBar } from '@skeletonlabs/skeleton';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	import { setDoc, getDocs, query, orderBy } from 'firebase/firestore';

	import { goto } from '$app/navigation';

	import LessonCard from '$lib/components/create/cards/LessonCard.svelte';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getLessonsColl, getLessonsDoc } from '$lib/docRefs.js';
	import type { Lesson } from '$lib/stores/courses.js';

	let { data } = $props();

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	// Fetches all lessons
	async function getLessons() {
		let lessons: Lesson[] = [];

		// Fetches the lessons collection
		let fetchedLessons = await getDocs(
			query(getLessonsColl(data.params.course), orderBy('index', 'asc'))
		);
		fetchedLessons.forEach((lesson) => {
			lessons.push(lesson.data());
		});

		// Success Toast
		const toastSettings: ToastSettings = {
			message: `Loaded ${data.params.course}`,
			background: `variant-filled-success`,
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toastSettings);

		return lessons;
	}

	function addNewLesson() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide a name for the lesson',
			valueAttr: { type: 'text', minlength: 3, maxlength: 50, required: true },
			response: async (r: string) => {
				// Stops excustion if user canceled
				if (!r) return;

				let lessonsLength = 0;
				await getLessons().then((lessons) => (lessonsLength = lessons.length));

				let newLesson: any = {
					title: r,
					index: lessonsLength,
					dictionary: []
				};

				// Sets a new document in the lessons collection then redirect to it
				setDoc(getLessonsDoc(data.params.course, r), newLesson);
				goto(`/create/${data.params.course}/${r}`);
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader
		title={`Create / ${data.params.course}`}
		showMainRoutes={false}
		showBackButton={true}
		showHomeButton={true}
	/>
	<main class="flex-grow overflow-auto p-6 flex gap-14 relative flex-wrap content-start">
		{#await getLessons()}
			<ProgressBar
				meter={'bg-primary-500 h-1'}
				track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
				rounded={'rounded-none'}
			/>
		{:then lessons}
			{#each lessons as lesson, i}
				<a href="/create/{data.params.course}/{lesson.title}">
					<LessonCard title={lesson.title} image={lesson.background} index={i} />
				</a>
			{/each}
			<button
				class="btn justify-between absolute top-5 right-5 variant-filled-primary"
				onclick={addNewLesson}
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				<span>Add Lesson</span>
			</button>
		{:catch}
			<p>Error</p>
		{/await}
	</main>
</div>
