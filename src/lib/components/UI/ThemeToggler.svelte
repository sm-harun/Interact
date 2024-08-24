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

<button class="text-xl btn rounded-full hover:bg-secondary-500/30" use:popup={themesPopup}>
	<span>Themes</span>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
		<path
			fill-rule="evenodd"
			d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
			clip-rule="evenodd"
		/>
	</svg>
</button>

<!-- This is the popup to select the Theme. -->
<div class="card w-80 p-5 bg-primary-500 z-50" data-popup="theme-list">
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
	<p class="text-sm text-primary-100/40">
		These themes are powered by <strong>Skeleton UI</strong>
	</p>
	<div class="arrow bg-surface-100-800-token" />
</div>
