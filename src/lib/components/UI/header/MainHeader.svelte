<script lang="ts">
	import { page } from '$app/stores';

	import { fly } from 'svelte/transition';

	import { webTitle } from '$lib/stores/themes';

	import ThemeToggler from './ThemesButton.svelte';
	import TopIcon from './TopIcon.svelte';
</script>

<header class="flex-shrink-0 w-screen h-36 variant-glass-surface sticky top-0 flex flex-col">
	<section class="flex-[2_1_0] p-3 flex items-center justify-between">
		<div class="flex justify-between items-center gap-4 pl-4">
			<h1 class="text-3xl lg:text-4xl text-primary-500-400-token text-border">
				{$webTitle}
			</h1>
		</div>
		<nav
			class="h-full list-none text-2xl flex justify-end lg:justify-evenly items-center lg:pr-4 gap-1 lg:gap-3"
		>
			<li>
				<ThemeToggler />
			</li>
			<li>
				<TopIcon />
			</li>
		</nav>
	</section>

	<section class="flex-[2_1_0] px-4 flex items-center">
		<ol class="breadcrumb">
			<li class="crumb">
				<a
					href="/"
					class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
				>
					<span>Home</span>
					{#if $page.url.pathname === '/'}
						<div
							class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
							in:fly={{ x: 100, duration: 500 }}
						></div>
					{/if}
				</a>
			</li>
			<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
			<li class="crumb">
				<a
					href="/courses"
					class="text-lg hover:text-secondary-500 transition grid place-items-center relative"
					><span>Courses</span>
					{#if $page.url.pathname === '/courses'}
						<div
							class="w-full h-[1px] bg-primary-500-400-token rounded-container-token absolute bottom-0 -z-10"
							in:fly={{ x: -100, duration: 500 }}
						></div>
					{/if}
				</a>
			</li>
		</ol>
	</section>
</header>
