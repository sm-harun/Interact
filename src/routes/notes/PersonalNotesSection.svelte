<script lang="ts">
	import PersonalNotes from '$lib/components/notes/cards/PersonalNotes.svelte';

	interface Props {
		personalNotesCollection: any;
		addNewCollection: any;
		updateNotes: any;
	}

	let { personalNotesCollection, addNewCollection, updateNotes }: Props = $props();
</script>

<!-- Personal Notes Section -->
<section class="h-auto w-full pt-10">
	<h2 class="h2 pb-5">Personal Notes</h2>
	<div class="flex flex-wrap gap-4">
		{#each personalNotesCollection as collection}
			<PersonalNotes
				title={collection.title}
				notes={collection.length}
				todo={() => updateNotes(collection.title)}
			/>
		{/each}
		<button
			class="card card-hover flex min-w-52 flex-grow items-center justify-center gap-5 border-2 border-primary-500 py-8 text-xl"
			onclick={addNewCollection}
		>
			<span>Add Collection</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</div>
</section>
