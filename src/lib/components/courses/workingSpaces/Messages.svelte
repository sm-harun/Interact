<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { user } from '$lib/stores/credentials';
	import { renderText } from '$lib/stores/themes';

	interface Props {
		message: string;
		side: boolean;
	}

	let { message, side }: Props = $props();

	function takeFirstTwoLetters(name: string | null | undefined) {
		if (!name) return;
		return name[0] + name[1];
	}
</script>

<div class="mb-5 flex w-full gap-3" in:fly={{ y: 50, duration: 600, easing: cubicInOut }}>
	{#if !side}
		<div>
			<Avatar
				src={'/assets/robot-logo.jpg'}
				width="w-8 lg:w-12"
				rounded="rounded-full"
				border="border-2 bg-surface-800-100-token"
				fontSize={400}
			/>
		</div>
	{/if}
	<div
		class="{side
			? 'bg-surface-300-600-token ml-auto rounded-tl-container-token rounded-bl-container-token rounded-br-container-token'
			: 'bg-secondary-100-800-token rounded-tr-container-token rounded-bl-container-token rounded-br-container-token'} max-w-4/6 h-auto p-3 px-5 text-xl leading-relaxed"
	>
		{@html renderText(message)}
	</div>
	{#if side}
		<div>
			{#if $user?.photoURL}
				<Avatar
					src={$user.photoURL}
					width="w-8 lg:w-12"
					rounded="rounded-full"
					border="border-2 bg-surface-800-100-token"
				/>
			{:else}
				<Avatar
					initials={takeFirstTwoLetters($user?.displayName)}
					width="w-8 lg:w-12"
					rounded="rounded-full"
				/>
			{/if}
		</div>
	{/if}
</div>
