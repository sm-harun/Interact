<script>
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';

	export let data;
</script>

<MainHeader title={data.params.course} showMainRoutes={false} />
<hr />
<header
	class="variant-glass-surface w-screen h-20 sticky top-1 p-9 px-3 flex items-center justify-between z-40"
>
	{#if data.params.lesson !== undefined}
		<h1 class="text-3xl font-bold">{data.params.lesson}</h1>
	{:else}
		<h1 class="text-3xl font-bold">Welcome</h1>
	{/if}
</header>
<slot />
