<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import FirstSection from '$lib/welcomePageSections/FirstSection.svelte';
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<MainHeader showMainRoutes={false} title={'Insight'} showIcon={true} />
	<main class="flex flex-grow overflow-hidden px-[10%]">
		<FirstSection />
	</main>
</div>
