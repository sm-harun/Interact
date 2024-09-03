<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseCard from '$lib/components/UI/course/CourseCard.svelte';

	import { getModalStore, ProgressBar, type ModalSettings } from '@skeletonlabs/skeleton';
	import { getDocs, setDoc } from 'firebase/firestore';
	import { getCourseColl, getCourseDoc } from '$lib/docRefs';
	import MainHeader from '$lib/components/UI/header/MainHeader.svelte';

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
			valueAttr: { type: 'text', minlength: 3, maxlength: 15, required: true },
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
			<ProgressBar />
		{:then docs}
			{#each docs as doc}
				<a href="/create/{doc.title}">
					<CourseCard title={doc.title} image={doc.background} lessons={0} subjects={['math']} />
				</a>
			{/each}
			<button
				class="size-60 sm:size-72 btn rounded-container-token bg-primary-500/50"
				on:click={addNewCourse}
			>
				<span class="text-9xl">+</span>
			</button>
		{:catch error}
			<p>Error {console.log(error)}</p>
		{/await}
	</main>
</div>
