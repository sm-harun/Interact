<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import FirstSection from '$lib/welcomePageSections/FirstSection.svelte';
	import SecondSection from '$lib/welcomePageSections/SecondSection.svelte';
	import ThirdSection from '$lib/welcomePageSections/ThirdSection.svelte';
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<MainHeader showMainRoutes={false} title={'Insight'} showIcon={true} />
	<main class="flex-grow overflow-y-auto">
		<FirstSection />
		<SecondSection />
		<ThirdSection />
	</main>
</div>
