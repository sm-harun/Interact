<script lang="ts">
	import PersonalNotes from '../cards/PersonalNotes.svelte';

	export let personalNotesCollection: any;
	export let addNewCollection: any;
	export let updateNotes: any;
</script>

<!-- Personal Notes Section -->
<section class="w-full h-auto pt-10">
	<h2 class="h2 pb-5">Personal Notes</h2>
	<div class="grid grid-cols-3 gap-4">
		{#each $personalNotesCollection as collection}
			<PersonalNotes
				title={collection.title}
				notes={34}
				todo={() => updateNotes(collection.title)}
			/>
		{/each}
		<button
			class="card card-hover size-full border-2 border-primary-500 py-8 flex gap-5 justify-center items-center text-xl"
			on:click={addNewCollection}
		>
			<span>Add Collection</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</div>
</section>
