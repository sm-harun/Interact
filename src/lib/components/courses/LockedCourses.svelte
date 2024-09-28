<script lang="ts">
	import { fly } from 'svelte/transition';

	export let title: string;
	export let image: string;
</script>

<div
	class="card size-60 sm:size-72 rounded-container-token border-token border-secondary-500-400-token bg-cover bg-center relative"
	style="background-image: url({image});"
	transition:fly={{ x: 100, duration: 300 }}
>
	<div
		class="absolute size-full z-10 bg-black/60 rounded-container-token flex flex-col justify-center items-center"
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-10 absolute top-5 left-5"
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
		class="w-full h-full rounded-container-token bg-gradient-to-t from-surface-900/90 from-20% to-transparent to-100% flex flex-col justify-end gap-3 p-3 px-4 relative"
	>
		<h1
			class="text-2xl w-4/5 font-bold decoration-500-400-token text-primary-500-400-token absolute bottom-5 left-5"
		>
			{title}
		</h1>
	</div>
</div>
