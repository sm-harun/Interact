<script lang="ts">
	import { slide } from 'svelte/transition';

	interface Props {
		text: string;
		children: any;
	}

	let { text, children }: Props = $props();

	let opened = $state(false);
	let checked = $state(false);
</script>

<div class="">
	<div class="flex items-center">
		<button class="btn-icon" onclick={() => (opened = !opened)} aria-label="Open Course tree">
			<svg
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 {opened ? 'rotate-[270deg]' : 'rotate-180'} transition duration-500"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</button>
		<h3 class="h3 ellipsis-text">{text}</h3>
		<button class="ml-3" aria-label="Course Checkbox" onclick={() => (checked = !checked)}>
			<svg
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-8 {checked ? 'fill-primary-500' : ''}"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
				/>
			</svg>
		</button>
	</div>
	{#if opened}
		<div class="px-16 flex flex-col gap-3" transition:slide>
			{@render children()}
		</div>
	{/if}
</div>
