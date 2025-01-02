<script lang="ts">
	import type { Writable } from 'svelte/store';

	interface Props {
		navSectionsStatus: Writable<number>;
	}

	let { navSectionsStatus }: Props = $props();
</script>

<div
	class="w-full h-full absolute top-0 border-2 grid place-items-center"
	style="right: {$navSectionsStatus}%"
>
	This is the States Section
</div>
