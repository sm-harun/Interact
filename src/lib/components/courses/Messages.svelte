<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { user } from '$lib/stores/credentials';

	export let message: string;
	export let side: boolean;
</script>

<div class="w-full flex gap-3 mb-5" in:fly={{ y: 50, duration: 600, easing: cubicInOut }}>
	<div
		class="{side
			? 'ml-auto bg-surface-300-600-token rounded-tl-container-token rounded-br-container-token rounded-bl-container-token'
			: 'bg-secondary-400-500-token rounded-br-container-token rounded-bl-container-token rounded-tr-container-token'} w-4/6 h-auto p-3 px-5 text-xl"
	>
		{message}
	</div>
	{#if side}
		<Avatar
			src={$user.photoURL}
			width="w-8 lg:w-12"
			rounded="rounded-full"
			border="border-2 bg-surface-800-100-token"
		/>
	{/if}
</div>
