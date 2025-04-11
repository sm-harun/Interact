<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { writable } from 'svelte/store';
	import Messages from './Messages.svelte';
	import { GoogleGenerativeAI } from '@google/generative-ai';
	import { onMount } from 'svelte';
	import { Avatar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';

	let GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

	let messageValue: string = $state();

	let messages = writable<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);

	let messagesContainer: HTMLElement = $state();

	let currentLang = $state('English');

	let showLangPopup = $state(false);

	// This will hold all the options the AI can talk with
	let supportedLanguages = [
		'English',
		'Amharic',
		'Oromo',
		'Arabic',
		'French',
		'German',
		'Japanese',
		'Mandarin'
	];

	let genAI;
	let model;
	let chat: any;

	let firstPrompt2 = `You are now a teacher who explain concepts in easy to digest ways to a single student, she student will ask you to use a language he prefers, when he does that make sure you only use the language the student told you about, so don't mix two languages, act a bit mature but not too much, also don't ever discuss subjects that doesn't concern school ever, And don't give away answers easily when helping to answer questions, make them understand. Attention! when writing math notations use katex notation between 2 dollar signs, not 4. Make sure you follow this last rule carefully`;

	onMount(async () => {
		genAI = new GoogleGenerativeAI(GEMINI_KEY);
		model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
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
		getResponse(`${messageValue} use the ${currentLang} language for your response`).then(
			(response: string) => {
				// try {
				// 	console.log(JSON.parse(response).question, JSON.parse(response).answer);
				// } catch (SyntaxError: any) {
				// 	console.error(SyntaxError);
				// }
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
			}
		);
		messageValue = '';
	}
</script>

<main class="relative flex size-full flex-col overflow-hidden">
	<header
		class="variant-glass-surface absolute left-0 top-0 z-20 flex h-16 w-full flex-shrink-0 items-center justify-between gap-5 p-2 px-6"
	>
		<h3 class="h3 hidden 2xl:block">AI Assistant</h3>
		<div class="variant-ringed-primary relative">
			<button
				class="btn size-full justify-between px-10"
				onclick={() => (showLangPopup = !showLangPopup)}>{currentLang}</button
			>
			{#if showLangPopup}
				<div
					class="bg-surface-200-700-token absolute right-0 top-full z-50 h-auto w-full"
					transition:slide
				>
					<ListBox>
						{#each supportedLanguages as language}
							<ListBoxItem
								bind:group={currentLang}
								rounded={'rounded-none'}
								name="medium"
								on:click={() => setTimeout(() => (showLangPopup = !showLangPopup), 10)}
								value={language}>{language}</ListBoxItem
							>
						{/each}
					</ListBox>
				</div>
			{/if}
		</div>
	</header>
	<section
		class="flex max-w-full flex-grow flex-col overflow-y-auto p-3 pt-16 2xl:pt-3"
		bind:this={messagesContainer}
	>
		<!-- Initial message from the bot -->
		<div class="mt-16">
			<Messages message={'Ask me anything, I will guide you.'} side={false} />
		</div>
		{#each $messages.slice(2) as message}
			<Messages message={message.parts[0].text} side={message.role == 'user'} />
		{/each}
	</section>

	<form class="h-14 w-full flex-shrink-0" onsubmit={preventDefault(addMessage)}>
		<div class="input-group input-group-divider h-full w-full grid-cols-[1fr_auto] rounded-none">
			<input class="p-3" type="text" placeholder="Enter message..." bind:value={messageValue} />
			<button
				class="hover:varient-filled-primary variant-filled-secondary"
				aria-label="submit prompt"
			>
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
