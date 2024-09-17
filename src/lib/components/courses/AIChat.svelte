<script lang="ts">
	import { writable } from 'svelte/store';
	import Messages from './Messages.svelte';

	let messageValue: string;

	let messages = writable<string[]>([]);

	function addMessage() {
		messages.update((currentMessages: string[]) => [...currentMessages, messageValue]);
		messageValue = '';
	}
</script>

<main class="size-full relative flex flex-col">
	<section class="flex-grow flex flex-col p-3">
		{#each $messages as message, i}
			<Messages {message} side={i % 2 == 0} />
		{/each}
	</section>

	<form class="flex-shrink-0 h-14 w-full" on:submit|preventDefault={addMessage}>
		<div class="h-full w-full input-group input-group-divider grid-cols-[1fr_auto] rounded-none">
			<input
				class="p-3 text-white"
				type="text"
				placeholder="Enter message..."
				bind:value={messageValue}
			/>
			<button class="variant-filled-secondary hover:varient-filled-primary">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
					/>
				</svg>
			</button>
		</div>
	</form>
</main>
