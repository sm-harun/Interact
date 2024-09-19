<script lang="ts">
	import { getSectionsColl } from '$lib/docRefs.js';
	import { getDocs, orderBy, query } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import { sectionsPosition, mobSectionsPosition } from '$lib/stores/themes.js';

	import { ProgressBar } from '@skeletonlabs/skeleton';
	import AIChat from '$lib/components/courses/AIChat.svelte';
	import Notes from '$lib/components/courses/Notes.svelte';
	import TextSection from '$lib/components/courses/Sections/TextSection.svelte';
	import QuestionSection from '$lib/components/courses/Sections/QuestionSection.svelte';
	import PickSection from '$lib/components/courses/Sections/PickSection.svelte';
	import ListSection from '$lib/components/courses/Sections/ListSection.svelte';
	import VisualsLibrary from '$lib/components/visuals/VisualsLibrary.svelte';
	import AttentionSection from '$lib/components/courses/Sections/AttentionSection.svelte';
	import EquationSection from '$lib/components/courses/Sections/EquationSection.svelte';

	export let data;

	let sections: any[] = [];
	let visibleSectionsCount = 1;

	function showNextSection() {
		visibleSectionsCount++;
	}

	// To know if we have fetched the data yet.
	let fetched = false;

	onMount(async () => {
		await fetchSections().then((fetchedSections) => {
			fetchedSections.forEach((section) => {
				sections.push(section.data());
			});
		});
		setTimeout(() => (fetched = true), 500);
	});

	async function fetchSections() {
		let fetchedSections = await getDocs(
			query(getSectionsColl(data.params.course, data.params.lesson), orderBy('index', 'asc'))
		);
		return fetchedSections;
	}
</script>

<main class="flex h-full relative">
	<section
		class="absolute left-0 2xl:relative size-full 2xl:size-auto 2xl:flex-[3_1_0] border-r-[0.05rem] border-r-surface-400 pt-5 2xl:pt-0 p-6 flex flex-col"
		style="left: {-$mobSectionsPosition}%;"
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
						course={data.params.course}
						lesson={data.params.lesson}
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
	<section
		class="absolute w-full flex-1 2xl:flex-[2_1_0] h-full flex-shrink-0 overflow-hidden 2xl:sticky"
		style="left: {100 - $mobSectionsPosition}%;"
	>
		<div class="size-full absolute" style="right: {$sectionsPosition}%">
			<AIChat />
		</div>
		<div class="size-full absolute" style="left: {100 - $sectionsPosition}%">
			<Notes />
		</div>
	</section>
</main>
