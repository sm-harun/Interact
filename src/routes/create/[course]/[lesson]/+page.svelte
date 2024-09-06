<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TextComponent from '$lib/components/create/textsections/TextComponent.svelte';
	import QuestionComponent from '$lib/components/create/textsections/QuestionComponent.svelte';

	import {
		ProgressBar,
		getToastStore,
		getModalStore,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton';

	import { getDocs, setDoc, query, orderBy } from 'firebase/firestore';
	import { getSectionsColl, getSectionsDoc } from '$lib/docRefs';

	import { onMount } from 'svelte';
	import { showSectionPopup } from '$lib/stores/components.js';

	export let data;
	// This is used to rerender the choices UI.
	let updater = 0;
	let button: HTMLButtonElement;
	let toastStore = getToastStore();
	let modalStore = getModalStore();
	let sections: any[] = [];
	let emptyArray: any[] = [];

	// This is needed to check if we need a loading bar.
	let fetched = false;

	onMount(async () => {
		let fetchedSections = await getDocs(
			query(getSectionsColl(data.params.course, data.params.lesson), orderBy('index', 'asc'))
		);
		fetchedSections.forEach((section) => {
			sections.push(section.data());
			updater++;
		});

		fetched = true;

		// Success Toast
		const toastSettings: ToastSettings = {
			message: `Loaded "${data.params.lesson}"`,
			background: `variant-filled-success`,
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toastSettings);

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

	function createSection(selected: string, title: string) {
		if (selected == 'Text') {
			let newSection: ExplainSection = {
				type: 'Explanation',
				title: title,
				index: sections.length,
				text: ''
			};
			sections.push(newSection);
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
		} else if (selected == 'Question') {
			let newSection: QuestionSection = {
				type: 'Question',
				title: title,
				index: sections.length,
				choices: ['Choice 1'],
				answer: 1,
				explanation: ''
			};
			setDoc(getSectionsDoc(data.params.course, data.params.lesson, title), newSection);
			sections.push(newSection);
		}
		updater++;
	}
</script>

<div class="h-screen flex flex-col">
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
	<div class="p-5 sm:px-16 lg:px-32 xl:px-72 grid gap-5 relative">
		{#key updater}
			{#if JSON.stringify(sections) !== JSON.stringify(emptyArray)}
				{#each sections as section}
					{#if section.type == 'Explanation'}
						<TextComponent {section} course={data.params.course} lesson={data.params.lesson} />
					{:else if section.type == 'Question'}
						<QuestionComponent {section} course={data.params.course} lesson={data.params.lesson} />
					{/if}
				{/each}
			{:else if fetched}
				<p
					class="h4 bg-surface-300-600-token text-surface-500-400-token p-5 grid place-items-center rounded-container-token"
				>
					This lesson is empty, Add new sections
				</p>
			{:else}
				<ProgressBar
					meter={'bg-primary-500 h-1'}
					track={'bg-surface-500 absolute top-0 left-0 w-full h-1'}
					rounded={'rounded-none'}
				/>
			{/if}
		{/key}
	</div>
</div>
