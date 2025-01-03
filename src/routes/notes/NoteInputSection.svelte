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
	class="relative flex h-full flex-[2_1_0] flex-col border-t-2 border-primary-500 xl:flex-1 xl:border-l-2 xl:border-t-0"
>
	{#if inputTitle !== null}
		<input
			class="input h1 h-24 flex-shrink-0 rounded-none border-none !bg-transparent px-10 md:h-40"
			bind:value={inputTitle}
		/>
		<hr class="mx-4 mb-8" />
		<textarea
			class="textarea flex-grow border-none !bg-transparent p-5 px-5 text-xl"
			bind:value={textArea}
		></textarea>

		{#if oldTextArea !== textArea || oldTitle !== inputTitle}
			<p class="absolute right-4 top-4 text-2xl text-error-500">Unsaved!</p>
		{/if}

		<div class="bottom-10 flex h-auto w-full justify-end gap-5 p-6">
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
			class="h2 absolute right-1/2 top-1/2 grid w-4/5 -translate-y-1/2 translate-x-1/2 place-items-center text-surface-500/40"
		>
			No Note has been selected!
		</h2>
	{/if}
</div>
