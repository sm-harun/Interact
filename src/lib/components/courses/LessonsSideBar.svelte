<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	let { course, lessons, updateLessons } = $props();

	let drawerStore = getDrawerStore();

	let emptyArray: null[] = [];
</script>

<nav class="w-80 h-full flex-shrink-0 relative overflow-y-auto nav flex flex-col">
	{#if JSON.stringify(lessons) === JSON.stringify(emptyArray)}
		<ProgressBar
			meter={'bg-primary-500 h-1'}
			track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
			rounded={'rounded-none'}
		/>
	{:else}
		<h2
			class="h2 w-full bg-surface-100-800-token grid place-items-center p-4 reverse_item border-r-2 border-primary-500"
		>
			Lessons
		</h2>
		<hr />
		<div class="flex flex-col flex-grow reverse_item overflow-visible">
			{#each lessons as lesson, i}
				<a
					href="/courses/{course}/{lesson.title}"
					class="{$page.params.lesson === lesson.title
						? 'border-t-primary-500 border-b-primary-500 border-l-primary-500 z-10'
						: 'bg-surface-100-800-token border-r-primary-500 hover:brightness-150'} border-transparent border-2 w-full flex-grow flex items-center pl-4 p-8 py-6 px-2 transition duration-500 relative"
					onclick={() => {
						updateLessons();
						drawerStore.close();
					}}>{i + 1}. {lesson.title}</a
				>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.nav {
		transform: scaleX(-1);
	}

	.reverse_item {
		transform: scaleX(-1);
	}
</style>
