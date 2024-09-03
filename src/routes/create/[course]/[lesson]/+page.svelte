<script lang="ts">
	import ChoiceComponent from '$lib/components/create/textsections/ChoiceComponent.svelte';
	import TextComponent from '$lib/components/create/textsections/TextComponent.svelte';

	import { ProgressRadial, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	import { getDocs, setDoc } from 'firebase/firestore';
	import { getSectionsColl, getSectionsDoc } from '$lib/docRefs';

	import { onMount } from 'svelte';
	import { showSectionPopup } from '$lib/stores/components.js';

	export let data;
	// This is used to rerender the choices UI.
	let updater = 0;
	let button: HTMLButtonElement;
	let toastStore = getToastStore();
	let sections: any[] = [];

	onMount(async () => {
		let fetchedSections = await getDocs(getSectionsColl(data.params.course, data.params.lesson));
		fetchedSections.forEach((section) => {
			sections.push(section.data());
			updater++;
		});

		// Success Toast
		const toastSettings: ToastSettings = {
			message: `Loaded "${data.params.lesson}"`,
			background: `variant-filled-success`,
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toastSettings);

		button.onclick = (e) => {
			// This just creates a new Section on the client
			showSectionPopup(e, (selected) => {
				if (selected == 'Text') {
					let newSection: ExplainSection = {
						type: 'Explanation',
						title: '',
						text: ''
					};
					sections.push(newSection);
					setDoc(getSectionsDoc(data.params.course, data.params.lesson, 'New Section'), newSection);
				} else if (selected == 'Choice') {
					let newSection: ChoiceSection = {
						type: 'Choice',
						title: '',
						choices: [''],
						answer: 0,
						explanation: "It doesn't need one"
					};
					sections.push(newSection);
					setDoc(getSectionsDoc(data.params.course, data.params.lesson, 'New Section'), newSection);
				}
				updater++;
			});
		};
	});
</script>

<hr />
<header
	class="variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 flex items-center justify-between z-40"
>
	<h1 class="h2 font-bold text-primary-500-400-token ml-4">{data.params.lesson}</h1>
	<ul class="flex items-center justify-between gap-4">
		<button class="btn variant-ringed-primary hover:variant-filled-primary" bind:this={button}>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<span class="hidden lg:flex">Add Section</span></button
		>
	</ul>
</header>
<div class="p-5 sm:px-16 lg:px-32 xl:px-72 grid gap-5">
	{#key updater}
		{#if sections}
			{#each sections as section}
				{#if section.type == 'Explanation'}
					<TextComponent {section} course={data.params.course} lesson={data.params.lesson} />
				{:else if section.type == 'Choice'}
					<ChoiceComponent {section} course={data.params.course} lesson={data.params.lesson} />
				{/if}
			{/each}
		{:else}
			<ProgressRadial />
		{/if}
	{/key}
</div>
