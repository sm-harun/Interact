<script lang="ts">
	import NoteCourse from '../cards/NoteCourse.svelte';

	export let courseNotesCollection: any;
	export let updateNotes: any;
</script>

<!-- Course Notes Section -->
<section class="w-full h-auto">
	<h2 class="h2 pb-5">Course Notes</h2>
	<div class="flex flex-wrap gap-4">
		{#if $courseNotesCollection.length !== 0}
			{#each $courseNotesCollection as collection}
				<NoteCourse
					title={collection.title}
					notes={34}
					todo={() => updateNotes(collection.title)}
				/>
			{/each}
		{:else}
			<div class="text-xl text-surface-600-300-token bg-surface-500/20 p-8 rounded-container-token">
				To see course notes add some when taking courses
			</div>
		{/if}
	</div>
</section>
