<script lang="ts">
	import type { Writable } from 'svelte/store';

	interface Props {
		navSectionsStatus: Writable<number>;
	}

	let { navSectionsStatus }: Props = $props();
</script>

<section
	class="w-full h-full absolute top-0 flex flex-col p-5"
	style="right: {$navSectionsStatus}%"
>
	<button class="btn variant-ghost-primary w-full h-32 text-2xl gap-4"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
		</svg>
		<span>Add Object</span></button
	>
</section>
