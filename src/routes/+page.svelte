<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import FirstSection from '$lib/welcomePageSections/FirstSection.svelte';
</script>

<div class="flex h-screen w-screen flex-col">
	<MainHeader showMainRoutes={false} title={'Insight'} showIcon={true} />
	<main class="flex flex-grow px-[10%]">
		<FirstSection />
	</main>
</div>
