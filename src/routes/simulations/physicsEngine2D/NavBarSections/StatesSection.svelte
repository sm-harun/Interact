<script lang="ts">
	import type { Writable } from 'svelte/store';

	interface Props {
		navSectionsStatus: Writable<number>;
	}

	let { navSectionsStatus }: Props = $props();
</script>

<div
	class="absolute top-0 grid h-full w-full place-items-center"
	style="right: {$navSectionsStatus - 200}%"
>
	States funcitons! Under Development
</div>
