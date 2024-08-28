<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import { showProfilePopup } from '$lib/stores/components';

	export let user;

	let profileIcon: HTMLDivElement;

	onMount(() => {
		profileIcon.onclick = (e) => {
			showProfilePopup(e, user);
		};
	});
</script>

<div
	class="w-auto h-auto hover:brightness-125 rounded-full border-2 border-surface-400 active:scale-95 transition"
	bind:this={profileIcon}
>
	<Avatar src={user.photoURL} width="w-8 lg:w-12" rounded="rounded-full" />
</div>
