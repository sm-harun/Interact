<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	let { course, lessons, updateLessons } = $props();

	let drawerStore = getDrawerStore();

	let emptyArray: null[] = [];
</script>

<nav class="nav relative flex h-full w-80 flex-shrink-0 flex-col overflow-y-auto">
	{#if JSON.stringify(lessons) === JSON.stringify(emptyArray)}
		<ProgressBar
			meter={'bg-primary-500 h-1'}
			track={'bg-surface-500 absolute top-0 left-0 w-full h-[0.2rem]'}
			rounded={'rounded-none'}
		/>
	{:else}
		<h2
			class="reverse_item bg-surface-100-800-token h2 grid w-full place-items-center border-r-2 border-primary-500 p-4"
		>
			Lessons
		</h2>
		<hr />
		<div class="reverse_item flex flex-grow flex-col overflow-visible">
			{#each lessons as lesson, i}
				<a
					href="/courses/{course}/{lesson.title}"
					class="{$page.params.lesson === lesson.title
						? 'z-10 border-b-primary-500 border-l-primary-500 border-t-primary-500'
						: 'bg-surface-100-800-token border-r-primary-500 hover:brightness-150'} relative flex w-full flex-grow items-center border-2 border-transparent p-8 px-2 py-6 pl-4 transition duration-500"
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
