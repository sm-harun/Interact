<script lang="ts">
	export let inputTitle: string;
	export let textArea: string;
	export let currentCollection: string;
	export let oldTextArea: string;
	export let saveNote: () => void;
	export let resetNote: () => void;
</script>

<div class="flex-1 h-full border-l-2 border-primary-500 flex flex-col relative">
	{#if inputTitle}
		<input
			class="input rounded-none border-none !bg-transparent px-10 h-40 h1 flex-shrink-0"
			value={inputTitle}
		/>
		<hr class="mx-4 mb-8" />
		<textarea
			class="textarea border-none p-5 px-5 !bg-transparent flex-grow text-xl"
			bind:value={textArea}
		/>
		{#if oldTextArea !== textArea}
			<p class="text-2xl text-error-500 absolute top-4 right-4">Unsaved!</p>
		{/if}

		<div class="absolute bottom-10 right-8 flex gap-5">
			<button
				class="{oldTextArea == textArea
					? 'variant-ghost-primary'
					: 'variant-filled-primary'} btn text-xl px-6"
				on:click={resetNote}>Reset</button
			>
			<button
				class="{oldTextArea == textArea
					? 'variant-ghost-primary'
					: 'variant-filled-primary'} btn text-xl px-6"
				on:click={saveNote}>Save</button
			>
		</div>
	{:else}
		<h2 class="h2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-surface-500/40">
			No Note has been selected!
		</h2>
	{/if}
</div>
