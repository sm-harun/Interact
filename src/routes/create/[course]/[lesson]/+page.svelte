<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TextComponent from '$lib/components/create/sections/TextComponent.svelte';
	import QuestionComponent from '$lib/components/create/sections/QuestionComponent.svelte';
	import DictionaryComponent from '$lib/components/create/sections/DictionaryComponent.svelte';
	import PickSection from '$lib/components/create/sections/PickSection.svelte';
	import ListSection from '$lib/components/create/sections/ListSection.svelte';
	import AttentionSection from '$lib/components/create/sections/AttentionSection.svelte';
	import TrueOrFalse from '$lib/components/create/sections/TrueOrFalse.svelte';
	import EquationSection from '$lib/components/create/sections/EquationSection.svelte';
	import VisualsLibrary from '$lib/components/visuals/VisualsLibrary.svelte';

	import {
		ProgressBar,
		getToastStore,
		getModalStore,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { getDocs, setDoc, query, orderBy } from 'firebase/firestore';
	import { getLessonsDoc, getSectionsColl, getSectionsDoc } from '$lib/docRefs';

	import { onMount } from 'svelte';
	import { showSectionPopup } from '$lib/stores/components.js';
	import { arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
	import type {
		BasicSection,
		QuestionSection,
		ExplainSection,
		EquationSectionType,
		TrueOrFalseType,
		Section
	} from '$lib/stores/courses.js';
	import { writable } from 'svelte/store';

	export let data;

	// These are used to update UI easily
	let dictUpdater = 0;

	let container: HTMLDivElement;

	let button: HTMLButtonElement;
	let toastStore = getToastStore();
	let modalStore = getModalStore();

	let words: any[] = [];
	let emptyArray: any[] = [];

	let sections = writable<Section[]>([]);

	// This is needed to check if we need a loading bar.
	let fetched = false;

	onMount(async () => {
		let fetchedSections = await getDocs(
			query(getSectionsColl(data.params.course, data.params.lesson), orderBy('index', 'asc'))
		);
		fetchedSections.forEach((section) => {
			sections.update((sections) => [...sections, section.data()]);
		});

		let fetchedWords = await getDoc(getLessonsDoc(data.params.course, data.params.lesson));
		words = fetchedWords?.data().dictionary;

		fetched = true;

		// Success Toast
		const toastSettings: ToastSettings = {
			message: `Loaded "${data.params.lesson}"`,
			background: `variant-filled-success`,
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toastSettings);

		// This is the add seciton button
		button.onclick = (e) => {
			showSectionPopup(e, (selected) => {
				const modalSettings: ModalSettings = {
					type: 'prompt',
					title: 'Provide a Title for this new Section',
					valueAttr: { type: 'text', minlength: 3, required: true },
					response: (r: string) => {
						if (!r) return;
						createSection(selected, r);
					}
				};
				modalStore.trigger(modalSettings);
			});
		};
	});

	function updateDictionary() {
		dictUpdater++;
	}

	function createSection(selected: string, title: string) {
		if (selected == 'Text') {
			let newSection: ExplainSection = {
				type: 'Explanation',
				title: title,
				index: $sections.length,
				text: '',
				skip: false
			};
			sections.update((sections) => [...sections, newSection]);
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
		} else if (selected == 'Question') {
			let newSection: QuestionSection = {
				type: 'Question',
				title: title,
				index: $sections.length,
				choices: [],
				answer: -1,
				explanation: '',
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'TrueOrFalse') {
			let newSection: TrueOrFalseType = {
				type: 'TrueOrFalse',
				title: title,
				index: $sections.length,
				skip: false,
				questions: [],
				answers: []
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'Visual') {
			let newSection: any = {
				type: 'Visual',
				title: title,
				index: $sections.length,
				course: data.params.course,
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'Pick') {
			let newSection: any = {
				type: 'Pick',
				title: title,
				index: $sections.length,
				choices: [],
				answers: [],
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'List') {
			let newSection: ListSection = {
				type: 'List',
				title: title,
				index: $sections.length,
				list: [],
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'Attention') {
			let newSection: BasicSection = {
				type: 'Attention',
				title: title,
				index: $sections.length,
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		} else if (selected == 'Equation') {
			let newSection: EquationSectionType = {
				type: 'Equation',
				title: title,
				equations: [],
				index: $sections.length,
				skip: false
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.update((sections) => [...sections, newSection]);
		}

		// Scrolls to bottom
		setTimeout(() => {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: 'smooth'
			});
		}, 200);
	}

	function addDictionary() {
		const modalSettings: ModalSettings = {
			type: 'prompt',
			title: 'Provide the word',
			valueAttr: { type: 'text', required: true },
			response: async (r: string) => {
				if (!r) return;
				words.push(r.toLowerCase());
				updateDictionary();

				// Adds the word the lessons dictionary on the DataBase
				await updateDoc(getLessonsDoc(data.params.course, data.params.lesson), {
					dictionary: arrayUnion(r.toLowerCase())
				});

				// Success Toast
				const toastSettings: ToastSettings = {
					message: `Added ${r} to the dictionary`,
					background: `variant-filled-success`,
					hideDismiss: true,
					timeout: 3000
				};
				toastStore.trigger(toastSettings);
			}
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader
		title={`Create / ${data.params.course}`}
		showMainRoutes={false}
		showBackButton={true}
	/>
	<hr />
	<header
		class="variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 flex items-center justify-between z-40"
	>
		<h1 class="h2 font-bold text-primary-500-400-token ml-4">{data.params.lesson}</h1>
		<ul class="flex items-center justify-between gap-4">
			<button
				class="btn variant-ringed-primary hover:variant-filled-primary"
				on:click={addDictionary}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 ml-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
					/>
				</svg>

				<span class="hidden lg:flex">Add Dictionary</span></button
			>
			<button class="btn variant-ringed-primary hover:variant-filled-primary" bind:this={button}>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				<span class="hidden lg:flex">Add Section</span></button
			>
		</ul>
	</header>
	<div
		class="p-5 sm:px-16 lg:px-32 xl:px-72 grid gap-5 relative overflow-y-auto"
		bind:this={container}
	>
		{#if JSON.stringify($sections) !== JSON.stringify(emptyArray)}
			{#key dictUpdater}
				<DictionaryComponent
					{words}
					course={data.params.course}
					lesson={data.params.lesson}
					bind:dictUpdater
				/>
			{/key}
			{#each $sections as section}
				{#if section.type == 'Explanation'}
					<TextComponent {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Question'}
					<QuestionComponent {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Pick'}
					<PickSection {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'TrueOrFalse'}
					<TrueOrFalse {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'List'}
					<ListSection {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Attention'}
					<AttentionSection {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Equation'}
					<EquationSection {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Visual'}
					<VisualsLibrary {section} />
				{/if}
			{/each}
		{:else if fetched}
			<DictionaryComponent
				{words}
				course={data.params.course}
				lesson={data.params.lesson}
				bind:dictUpdater
			/>
			<p
				class="h4 bg-surface-300-600-token text-surface-500-400-token p-5 grid place-items-center rounded-container-token"
			>
				This lesson is empty, Add new sections
			</p>
		{:else}
			<ProgressBar
				meter={'bg-primary-500 h-1'}
				track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
				rounded={'rounded-none'}
			/>
		{/if}
	</div>
</div>
