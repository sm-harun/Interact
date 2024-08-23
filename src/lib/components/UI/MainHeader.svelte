<script lang="ts">
	import { page } from '$app/stores';

	let aHomeStyle: string = $page.url.pathname === '/' ? 'text-tertiary-500' : '';
	let aCoursesStyle: string = $page.url.pathname === '/courses' ? 'text-tertiary-500' : '';

	// We refrence it to toggle between fullscreen.
	const fullscreenElement = document.documentElement;

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			if (fullscreenElement.requestFullscreen) {
				fullscreenElement.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}
</script>

<header class="w-screen h-36 variant-glass-primary sticky top-0 flex flex-col">
	<section class="flex-[2_1_0] p-3 flex items-center justify-between px-6">
		<h1 class="text-4xl text-secondary-500">Interact</h1>
		<nav class="h-full list-none text-2xl flex justify-evenly items-center gap-6">
			<li>
				<button class="text-xl btn rounded-full hover:bg-secondary-500/30"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
						/>
					</svg>
					<span>Themes</span>
				</button>
			</li>
			<li>
				<button
					class="text-xl btn rounded-full hover:bg-secondary-500/30"
					on:click={toggleFullscreen}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
						/>
					</svg>
					<span>Full Screen</span></button
				>
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
