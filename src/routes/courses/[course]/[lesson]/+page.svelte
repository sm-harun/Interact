<script lang="ts">
	import { getSectionsColl } from '$lib/docRefs.js';
	import { getDocs, orderBy, query } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	export let data;

	let sections: any[] = [];
	let emptyArray: any[] = [];
	let updater = 0;

	onMount(async () => {
		await fetchSections().then((fetchedSections) => {
			fetchedSections.forEach((section) => {
				console.log(section);
				sections.push(section.data());
				updater++;
			});
		});
	});

	async function fetchSections() {
		let fetchedSections = await getDocs(
			query(getSectionsColl(data.params.course, data.params.lesson), orderBy('index', 'asc'))
		);
		return fetchedSections;
	}
</script>

<main class="flex h-full">
	<section class="flex-[3_1_0] h-full border-r-[0.05rem] border-r-surface-400 relative">
		{#key updater}
			{#if JSON.stringify(sections) === JSON.stringify(emptyArray)}
				<ProgressBar
					meter={'bg-primary-500 h-1'}
					track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
				/>
			{:else}
				{#each sections as section}
					<p class="text-xl p-5">This is {section.title}</p>
					<p class="text-sm p-5">This is {section.text}</p>
				{/each}
			{/if}
		{/key}
	</section>
	<section class="flex-[2_1_0] h-full flex-shrink-0"></section>
</main>
