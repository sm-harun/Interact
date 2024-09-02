<script lang="ts">
	import { onMount } from 'svelte';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
	import { DataBase } from '$lib/firebase.js';
	import LessonCard from '$lib/components/UI/course/lessonCard.svelte';

	export let data;

	let Course: Course;
	const docRef = doc(DataBase, 'courses', data.params.course);

	let modalStore = getModalStore();
	let toastStore = getToastStore();

	async function getUserData() {
		const courseData = await getDoc(docRef);

		return courseData;
	}

	onMount(() => {
		getUserData().then(async (courseData) => {
			if (courseData.exists()) {
				Course = courseData.data();

				const toastSettings: ToastSettings = {
					message: `Loaded ${Course.title}`,
					background: `variant-filled-success`,
					hideDismiss: true,
					timeout: 3000
				};
				toastStore.trigger(toastSettings);
			} else {
				await setDoc(docRef, {
					title: data.params.course,
					background: '',
					lessons: []
				});
			}
		});
	});

	function addNewLesson() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide a name for the lesson',
			valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
			response: async (r: string) => {
				if (r) {
					let newLesson: Lesson = {
						title: r,
						sections: []
					};

					Course.lessons.push(newLesson);

					await updateDoc(docRef, {
						lessons: Course.lessons
					});
				}
			}
		};
		modalStore.trigger(modalSettings);
	}

	function addhiphens(word: string) {
		return word.replace(' ', '-');
	}
</script>

<button
	class="btn justify-between absolute top-5 right-5 variant-filled-primary"
	on:click={addNewLesson}
>
	<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
	</svg>
	<span>Add Lesson</span>
</button>

{#if Course}
	{#each Course.lessons as lesson}
		<a href="/create/{Course.title}/{addhiphens(lesson.title)}">
			<LessonCard title={lesson.title} image={lesson.background} sections={lesson.sections} />
		</a>
	{/each}
{/if}
