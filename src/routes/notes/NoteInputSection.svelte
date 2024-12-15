<script lang="ts">
	interface Props {
		inputTitle: string;
		textArea: string;
		oldTitle: string;
		oldTextArea: string;
		saveNote: () => void;
		resetNote: () => void;
	}

	let {
		inputTitle = $bindable(),
		textArea = $bindable(),
		oldTitle = $bindable(),
		oldTextArea = $bindable(),
		saveNote,
		resetNote
	}: Props = $props();
</script>

<div
	class="flex-[2_1_0] xl:flex-1 h-full border-t-2 xl:border-t-0 xl:border-l-2 border-primary-500 flex flex-col relative"
>
	{#if inputTitle !== null}
		<input
			class="input rounded-none border-none !bg-transparent px-10 h-24 md:h-40 h1 flex-shrink-0"
			bind:value={inputTitle}
		/>
		<hr class="mx-4 mb-8" />
		<textarea
			class="textarea border-none p-5 px-5 !bg-transparent flex-grow text-xl"
			bind:value={textArea}
		></textarea>

		{#if oldTextArea !== textArea || oldTitle !== inputTitle}
			<p class="text-2xl text-error-500 absolute top-4 right-4">Unsaved!</p>
		{/if}

		<div class="w-full h-auto bottom-10 gap-5 flex justify-end p-6">
			<button
				class="{oldTextArea == textArea && oldTitle == inputTitle
					? 'variant-ghost-primary'
					: 'variant-filled-primary'} btn px-6"
				onclick={resetNote}>Reset</button
			>
			<button
				class="{oldTextArea == textArea && oldTitle == inputTitle
					? 'variant-ghost-primary'
					: 'variant-filled-primary'} btn px-6"
				onclick={saveNote}>Save</button
			>
		</div>
	{:else}
		<h2
			class="h2 w-4/5 grid place-items-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-surface-500/40"
		>
			No Note has been selected!
		</h2>
	{/if}
</div>
