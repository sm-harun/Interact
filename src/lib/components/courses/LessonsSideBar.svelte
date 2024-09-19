<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	export let course;
	export let lessons;
	export let updateLessons;

	let drawerStore = getDrawerStore();

	let emptyArray: null[] = [];
</script>

<nav class="w-80 bg-surface-200-700-token h-full flex-shrink-0 relative z-50">
	{#if JSON.stringify(lessons) === JSON.stringify(emptyArray)}
		<ProgressBar
			meter={'bg-primary-500 h-1'}
			track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
			rounded={'rounded-none'}
		/>
	{:else}
		<h2 class="h2 w-full grid place-items-center p-4">Lessons</h2>
		{#each lessons as lesson, i}
			<a
				href="/courses/{course}/{lesson.title}"
				class="{$page.params.lesson === lesson.title
					? 'border-b-2 border-primary-500'
					: ''} w-full h-14 flex items-center pl-4 hover:backdrop-brightness-150 px-2"
				on:click={() => {
					updateLessons();
					drawerStore.close();
				}}>{i + 1}. {lesson.title}</a
			>
			<hr />
		{/each}
	{/if}
</nav>
