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
	<section class="flex-[2_1_0] p-3 flex items-center justify-between px-6">
		<h1 class="text-4xl text-secondary-500">{$webTitle}</h1>
		<nav class="h-full list-none text-2xl flex justify-evenly items-center gap-6">
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

	<section class="flex-[1_1_1rem] px-4 flex items-center">
		<ol class="breadcrumb">
			<li class="crumb">
				<a href="/" class={aHomeStyle + ' text-xl hover:text-secondary-500 transition'}>Home</a>
			</li>
			<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
			<li class="crumb">
				<a href="/courses" class={aCoursesStyle + ' text-xl hover:text-secondary-500 transition'}
					>Courses</a
				>
			</li>
		</ol>
	</section>
</header>
