<script lang="ts">
	import MainHeader from '$lib/components/UI/header/MainHeader.svelte';
</script>

<div class="h-screen flex flex-col">
	<MainHeader title={'Create'} showMainRoutes={false} showBackButton={true} />
	<slot />
</div>
