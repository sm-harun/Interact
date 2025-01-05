<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		title: string;
		type: string;
	}

	let { children, title, type }: Props = $props();

	let flashing = $state(false);
</script>

<div
	class="bg-surface-100-800-token flex w-auto flex-col gap-2 border-2 border-surface-500 p-5 rounded-container-token"
>
	<div class="flex items-center justify-between">
		<h4 class="h3 ml-5">{title}</h4>
		<div>
			<button class="btn-icon" aria-label="Adjust Camera">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
					/>
				</svg>
			</button>
			<button
				class="btn-icon {flashing ? 'variant-filled animate-pulse' : ''}"
				onclick={() => (flashing = !flashing)}
				aria-label="Flash Position"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
					/>
				</svg>
			</button>
		</div>
	</div>
	<hr class="my-3" />

	{@render children?.()}

	<hr class="my-3" />

	<div class="flex items-center">
		<p>Type: <strong class="mx-2">{type}</strong></p>
	</div>
</div>
