<script lang="ts">
	import { page } from '$app/stores';

	import { webTitle } from './../../stores/themes';

	import FullScreenToggler from './FullScreenToggler.svelte';
	import ThemeToggler from './ThemeToggler.svelte';
	import ProfileIcon from './ProfileIcon.svelte';

	// Gives the buttons indication of which URL we are in.
	let aHomeStyle: string = $page.url.pathname === '/' ? 'text-tertiary-400' : '';
	let aCoursesStyle: string = $page.url.pathname === '/courses' ? 'text-tertiary-400' : '';
</script>

<header class="w-screen h-36 variant-glass-surface sticky top-0 flex flex-col">
	<section class="flex-[2_1_0] p-3 flex items-center justify-between">
		<div class="flex justify-between items-center gap-4 pl-4">
			<h1 class="text-3xl lg:text-4xl text-secondary-500 font-bold">{$webTitle}</h1>
		</div>
		<nav
			class="h-full list-none text-2xl flex justify-end lg:justify-evenly items-center pr-6 gap-3"
		>
			<li>
				<ThemeToggler />
			</li>
			<li>
				<FullScreenToggler />
			</li>
			<li>
				<ProfileIcon />
			</li>
		</nav>
	</section>

	<section class="flex-[2_1_0] px-4 flex items-center">
		<ol class="breadcrumb">
			<li class="crumb">
				<a href="/" class={aHomeStyle + ' text-lg hover:text-secondary-500 transition'}>Home</a>
			</li>
			<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
			<li class="crumb">
				<a href="/courses" class={aCoursesStyle + ' text-lg hover:text-secondary-500 transition'}
					>Courses</a
				>
			</li>
		</ol>
	</section>
</header>
