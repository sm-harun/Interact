<script lang="ts">
	import { popup, ListBox, ListBoxItem, LightSwitch } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { theme } from './../../stores/themes';
	import type { Theme } from './../../stores/themes';

	// Settings for a theme selector popup.
	const themesPopup: PopupSettings = {
		event: 'click',
		target: 'theme-list',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	let currentTheme: Theme = $theme;
	$: {
		theme.set(currentTheme);
		document.body.setAttribute('data-theme', $theme);
	}
</script>

<button
	class="text-xl btn rounded-full hover:bg-secondary-500/30 justify-center lg:justify-between"
	use:popup={themesPopup}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
		/>
	</svg>
	<span class="hidden lg:block">Themes</span>
</button>

<!-- This is the popup to select the Theme. -->
<div
	class="card w-60 lg:w-80 text-lg lg:text-xl p-5 variant-surface-700 z-50 border-1"
	data-popup="theme-list"
>
	<div class="flex justify-between">
		<p><strong>Dark Mode</strong></p>
		<LightSwitch />
	</div>
	<hr class="mt-4 mb-4" />
	<ListBox>
		<ListBoxItem bind:group={currentTheme} name="medium" value="crimson">Crimson</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="vintage">Vintage</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="hamlindigo">hamlindigo</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="modern">Modern</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="wintry">Wintry</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="seafoam">Seafoam</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="skeleton">Skeleton</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="rocket">Rocket</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="sahara">Sahara</ListBoxItem>
		<ListBoxItem bind:group={currentTheme} name="medium" value="gold-nouveau"
			>Gold Nouveau</ListBoxItem
		>
	</ListBox>
	<hr class="mt-4 mb-4" />
	<p class="text-sm text-primary-800/50">
		These themes are powered by <strong>Skeleton UI</strong>
	</p>
</div>
