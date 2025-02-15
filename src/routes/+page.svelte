<script lang="ts">
	import { goto } from '$app/navigation';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { user } from '$lib/stores/credentials';
	import FirstSection from '$lib/welcomePageSections/FirstSection.svelte';
	import SecondSection from '$lib/welcomePageSections/SecondSection.svelte';
	import ThirdSection from '$lib/welcomePageSections/ThirdSection.svelte';
	import { onDestroy, onMount } from 'svelte';

	let animationFrame: number;

	function loop() {
		if ($user) goto('/home');
		animationFrame = requestAnimationFrame(loop);
	}

	onMount(() => loop());

	onDestroy(() => cancelAnimationFrame(animationFrame));
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<MainHeader showMainRoutes={false} title={'Insight'} showIcon={true} />
	<main class="flex-grow overflow-y-auto">
		<FirstSection />
		<SecondSection />
		<ThirdSection />
	</main>
</div>
