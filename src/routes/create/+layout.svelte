<script lang="ts">
	import MainHeader from '$lib/components/UI/header/MainHeader.svelte';
</script>

<div class="h-screen flex flex-col">
	<MainHeader title={'Create'} showMainRoutes={false} showBackButton={true} />
	<main class="flex-grow overflow-auto p-6 flex gap-14 relative flex-wrap">
		<slot />
	</main>
</div>
