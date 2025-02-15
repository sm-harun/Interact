<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';

	import TextSection from '$lib/components/courses/Sections/TextSection.svelte';
	import QuestionSection from '$lib/components/courses/Sections/QuestionSection.svelte';
	import PickSection from '$lib/components/courses/Sections/PickSection.svelte';
	import ListSection from '$lib/components/courses/Sections/ListSection.svelte';
	import TrueOrFalse from '$lib/components/courses/Sections/TrueOrFalse.svelte';
	import VisualsLibrary from '$lib/components/visuals/VisualsLibrary.svelte';
	import AttentionSection from '$lib/components/courses/Sections/AttentionSection.svelte';
	import EquationSection from '$lib/components/courses/Sections/EquationSection.svelte';

	import { getSectionsColl, getUserCoursesDoc } from '$lib/docRefs';
	import { setDoc } from 'firebase/firestore';

	import { type Lesson, type Section } from '$lib/stores/courses';

	import { mobSectionsPosition } from '$lib/stores/themes';

	import {
		getDocs,
		query,
		orderBy,
		type QueryDocumentSnapshot,
		type DocumentData
	} from 'firebase/firestore';

	import { onMount } from 'svelte';
	import { user } from '$lib/stores/credentials';

	interface Props {
		course: string;
		lesson: string;
		lessons: Lesson[];
	}

	let { course, lesson, lessons }: Props = $props();

	let sections: Section[] = [];
	let visibleSectionsCount = $state(1);

	let sectionElement: HTMLElement = $state();

	function getIndexFromArray(): number {
		let index = 0;
		lessons.forEach((lessonFromArr, i) => {
			if (lessonFromArr.title == lesson) {
				index = i;
			}
		});

		return index + 1;
	}

	function showNextSection() {
		visibleSectionsCount++;

		setProgress();

		// This will wait just a bit for the lesson to fetched and created first
		setTimeout(() => {
			sectionElement.scrollTo({
				top: sectionElement.scrollHeight,
				behavior: 'smooth'
			});
		}, 300);
	}

	function setProgress() {
		if (sections.length == visibleSectionsCount) {
			let userCourseProgress = {
				progress: getIndexFromArray() / lessons.length
			};

			setDoc(getUserCoursesDoc($user?.uid, course), userCourseProgress);
		}
	}

	// To know if we have fetched the data yet.
	let fetched = $state(false);

	onMount(async () => {
		await fetchSections().then((fetchedSections) => {
			fetchedSections.forEach((section: QueryDocumentSnapshot<Section, DocumentData>) => {
				sections.push(section.data());
			});
		});
		setTimeout(() => (fetched = true), 500);

		setProgress();
	});

	async function fetchSections() {
		let fetchedSections = await getDocs(
			query(getSectionsColl(course, lesson), orderBy('index', 'asc'))
		);
		return fetchedSections;
	}
</script>

<section
	class="absolute left-0 flex max-h-full w-full flex-col overflow-y-scroll p-6 pt-10 2xl:relative 2xl:w-auto 2xl:flex-[3_1_0]"
	style="left: {-$mobSectionsPosition}%;"
	bind:this={sectionElement}
>
	{#if !fetched}
		<ProgressBar
			meter={'bg-primary-500 h-1'}
			track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
			rounded={'rounded-none'}
		/>
	{:else}
		{#each sections.slice(0, visibleSectionsCount) as section}
			{#if section.type == 'Explanation'}
				<TextSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
					{course}
					{lesson}
				/>
			{:else if section.type == 'Question'}
				<QuestionSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'Pick'}
				<PickSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'TrueOrFalse'}
				<TrueOrFalse
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'List'}
				<ListSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'Attention'}
				<AttentionSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'Equation'}
				<EquationSection
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{:else if section.type == 'Visual'}
				<VisualsLibrary
					{section}
					{showNextSection}
					showNextButton={visibleSectionsCount != sections.length}
				/>
			{/if}
			<!-- Adds space between sections -->
			<div class="my-10"></div>
		{/each}
	{/if}
</section>
