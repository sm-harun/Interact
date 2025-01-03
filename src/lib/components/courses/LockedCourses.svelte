<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Props {
		title: string;
		image: string;
	}

	let { title, image }: Props = $props();
</script>

<div
	class="card border-secondary-500-400-token relative size-60 bg-cover bg-center border-token rounded-container-token sm:size-72"
	style="background-image: url({image});"
	transition:fly={{ x: 100, duration: 300 }}
>
	<div
		class="absolute z-10 flex size-full flex-col items-center justify-center bg-black/60 rounded-container-token"
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="absolute left-5 top-5 size-10"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
			/>
		</svg>
		<h3 class="h3 font-bold">Sign in to access</h3>
	</div>
	<div
		class="relative flex h-full w-full flex-col justify-end gap-3 bg-gradient-to-t from-surface-900/90 from-20% to-transparent to-100% p-3 px-4 rounded-container-token"
	>
		<h1
			class="decoration-500-400-token text-primary-500-400-token absolute bottom-5 left-5 w-4/5 text-2xl font-bold"
		>
			{title}
		</h1>
	</div>
</div>
