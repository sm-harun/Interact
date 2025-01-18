<script lang="ts">
	import { goto } from '$app/navigation';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { user } from '$lib/stores/credentials';
	import FirstSection from '$lib/welcomePageSections/FirstSection.svelte';

	$effect(() => {
		if ($user) {
			goto('/courses');
		}
	});
</script>

<div class="flex h-screen w-screen flex-col">
	<MainHeader showMainRoutes={false} title={'InSight'} />
	<main class="flex flex-grow px-[10%]">
		<FirstSection />
	</main>
</div>
