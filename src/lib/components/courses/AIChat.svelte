<script lang="ts">
	import { writable } from 'svelte/store';
	import Messages from './Messages.svelte';
	import { GoogleGenerativeAI } from '@google/generative-ai';
	import { onMount } from 'svelte';

	let GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

	let messageValue: string;

	let messages = writable<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);

	let messagesContainer: HTMLElement;

	let genAI;
	let model;
	let chat: any;

	let firstPrompt2 = `You are now a teacher who explain concepts in easy to digest ways to a single student, act a bit mature but not too much, also don't ever discuss subjects that doesn't concern school ever, And don't give away answers easily when helping to answer questions, make them understand. Attention! when writing math notations use katex notation between dollar signs. Make sure you follow this last rule carefully`;

	onMount(async () => {
		genAI = new GoogleGenerativeAI(GEMINI_KEY);
		model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
		chat = model.startChat({
			history: $messages
		});
		await chat.sendMessage(firstPrompt2);
	});

	async function getResponse(prompt: string) {
		const result = await chat.sendMessage(prompt);
		return result.response.text();
	}

	function addMessage() {
		let newMessage = {
			role: 'user',
			parts: [{ text: messageValue }]
		};
		messages.update((currentMessages: any[]) => [...currentMessages, newMessage]);

		setTimeout(() => {
			messagesContainer.scrollTo({
				top: messagesContainer.scrollHeight,
				behavior: 'smooth'
			});
		}, 200);

		// Gets the response from Gemini
		getResponse(messageValue).then((response: string) => {
			// try {
			// 	console.log(JSON.parse(response).question, JSON.parse(response).answer);
			// } catch (SyntaxError: any) {
			// 	console.error(SyntaxError);
			// }
			console.log(response);

			let modelAnswer = {
				role: 'model',
				parts: [{ text: response }]
			};
			messages.update((currentMessages: any[]) => [...currentMessages, modelAnswer]);

			setTimeout(() => {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight,
					behavior: 'smooth'
				});
			}, 200);
		});
		messageValue = '';
	}
</script>

<main class="size-full relative flex flex-col overflow-hidden">
	<section
		class="flex-grow flex flex-col pt-16 2xl:pt-3 p-3 max-w-full overflow-y-auto"
		bind:this={messagesContainer}
	>
		<!-- Initial message from the bot -->
		<Messages message={'Ask me anything, I will guide you.'} side={false} />
		{#each $messages.slice(2) as message}
			<Messages message={message.parts[0].text} side={message.role == 'user'} />
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
