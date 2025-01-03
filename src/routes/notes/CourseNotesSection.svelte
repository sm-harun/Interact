<script lang="ts">
	import NoteCourse from '$lib/components/notes/cards/NoteCourse.svelte';

	interface Props {
		courseNotesCollection: any;
		updateNotes: any;
	}

	let { courseNotesCollection, updateNotes }: Props = $props();
</script>

<!-- Course Notes Section -->
<section class="h-auto w-full">
	<h2 class="h2 pb-5">Course Notes</h2>
	<div class="flex flex-wrap gap-4">
		{#if courseNotesCollection.length !== 0}
			{#each courseNotesCollection as collection}
				<NoteCourse
					title={collection.title}
					notes={collection.length}
					todo={() => updateNotes(collection.title)}
				/>
			{/each}
		{:else}
			<div class="text-surface-600-300-token bg-surface-500/20 p-8 text-xl rounded-container-token">
				To see course notes add some when taking courses
			</div>
		{/if}
	</div>
</section>
