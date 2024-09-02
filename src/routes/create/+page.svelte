<script lang="ts">
	import { goto } from '$app/navigation';
	import CourseCard from '$lib/components/UI/course/CourseCard.svelte';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { collection, getDocs } from 'firebase/firestore';
	import { DataBase } from '$lib/firebase';

	const modalStore = getModalStore();
	async function getCourses() {
		const fetchedCourses = await getDocs(collection(DataBase, 'courses'));

		const coursesArray: Course[] = [];
		fetchedCourses.forEach((doc) => {
			coursesArray.push(doc.data());
		});
		return coursesArray;
	}

	function addNewCourse() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide the Name for your Course',
			valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
			response: (r: string) => {
				if (r) {
					goto('/create/' + r);
				}
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

{#await getCourses()}
	<p>waiting...</p>
{:then docs}
	{#each docs as doc}
		<a href="/create/{doc.title}">
			<CourseCard
				title={doc.title}
				image={doc.background}
				subjects={['math']}
				lessons={doc.lessons}
			/>
		</a>
	{/each}
	<div>
		<CourseCard
			title={'Vectors'}
			image={''}
			subjects={['math']}
			lessons={[';ajsdf', ';ajksdf', 'a;skjlfd', ';jsaklfd', 'aj;kflsd']}
		/>
	</div>
{:catch error}
	<p>Error {console.log(error)}</p>
{/await}
<button
	class="size-60 sm:size-72 btn rounded-container-token bg-primary-500/50"
	on:click={addNewCourse}
>
	<span class="text-9xl">+</span>
</button>
