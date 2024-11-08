<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import TestSettings from './TestSettings.svelte';
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<MainHeader showBackButton={true} showMainRoutes={false} />
	<main class="flex-grow flex">
		<!-- This is the Content Selection Section -->
		<section class="flex-[3_1_0] flex flex-col">
			<!-- This will display the courses -->
			<div class="flex-[1_1_0] flex flex-col overflow-hidden">
				<header
					class="flex-shrink-0 w-full h-20 bg-surface-100-800-token course-header-shadow flex items-center px-10"
				>
					<h2 class="h2">Courses</h2>
				</header>
				<main class="flex-grow p-5 flex flex-wrap gap-2"></main>
			</div>

			<!-- This will display the Tests -->
			<div class="flex-[1_1_0] border-surface-500 border-t-2 overflow-hidden">
				<header
					class="flex-shrink-0 w-full h-20 bg-surface-100-800-token notes-header-shadow flex items-center px-10"
				>
					<h2 class="h2">Notes</h2>
				</header>
			</div>
		</section>

		<TestSettings />
	</main>
</div>

<style>
	.course-header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
	.notes-header-shadow {
		box-shadow: 0 -0.5rem 2rem 0.1rem black;
	}
</style>
