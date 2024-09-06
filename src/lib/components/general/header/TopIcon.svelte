<script lang="ts">
	import ProfileIcon from './ProfileIcon.svelte';
	import LoginButton from './LoginButton.svelte';
	import { user } from '$lib/stores/credentials';
</script>

{#if $user}
	<ProfileIcon />
{:else}
	<LoginButton />
{/if}
