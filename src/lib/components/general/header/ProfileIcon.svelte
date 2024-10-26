<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import { showProfilePopup } from '$lib/stores/components';

	import { user } from '$lib/stores/credentials';

	let profileIcon: HTMLDivElement = $state();

	onMount(() => {
		profileIcon.onclick = (e) => {
			showProfilePopup(e);
		};
	});

	function takeFirstTwoLetters(name: string | null | undefined) {
		if (!name) return;
		return name[0] + name[1];
	}
</script>

<div
	class="w-auto h-auto hover:brightness-125 rounded-full border-2 border-surface-400 active:scale-95 transition"
	bind:this={profileIcon}
>
	{#if $user?.photoURL}
		<Avatar src={$user.photoURL} width="w-8 lg:w-12" rounded="rounded-full" />
	{:else}
		<Avatar
			initials={takeFirstTwoLetters($user?.displayName)}
			width="w-8 lg:w-12"
			rounded="rounded-full"
		/>
	{/if}
</div>
