<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseCard from '$lib/components/create/cards/CourseCard.svelte';

	import { getModalStore, ProgressBar, type ModalSettings } from '@skeletonlabs/skeleton';
	import { getDocs, setDoc } from 'firebase/firestore';
	import { getCourseColl, getCourseDoc } from '$lib/docRefs';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	const modalStore = getModalStore();

	// Fetches every course in the collection
	async function getCourses() {
		const fetchedCourses = await getDocs(getCourseColl());

		const coursesArray: any = [];
		fetchedCourses.forEach(async (course) => {
			let newCourse = {
				title: course.data().title,
				background: course.data().background
			};
			coursesArray.push(newCourse);
		});

		return coursesArray;
	}

	function addNewCourse() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide the Name for your Course',
			valueAttr: { type: 'text', minlength: 3, maxlength: 35, required: true },
			response: (r: string) => {
				if (r) {
					setDoc(getCourseDoc(r), {
						title: r,
						background: ''
					});
					goto('/create/' + r);
				}
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader title={'Create'} showMainRoutes={false} showBackButton={true} showHomeButton={true} />
	<main class="flex-grow p-6 overflow-auto flex gap-14 relative flex-wrap">
		{#await getCourses()}
			<ProgressBar
				meter={'bg-primary-500 h-1'}
				track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
				rounded={'rounded-none'}
			/>
		{:then docs}
			{#each docs as doc}
				<a href="/create/{doc.title}">
					<CourseCard {doc} />
				</a>
			{/each}
			<button
				class="btn justify-between absolute top-5 right-5 variant-filled-primary"
				on:click={addNewCourse}
			>
				<span>Add Course</span>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</button>
		{:catch error}
			<p>Error {console.log(error)}</p>
		{/await}
	</main>
</div>
