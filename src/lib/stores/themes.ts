import { readable, writable } from 'svelte/store';

export type Theme =
	| 'skeleton'
	| 'wintry'
	| 'modern'
	| 'rocket'
	| 'seafoam'
	| 'vintage'
	| 'sahara'
	| 'hamlindigo'
	| 'gold-nouveau'
	| 'crimson';

// Since the name of the website has not been decided it can easily be changed later.
export const webTitle = readable<string>('Interact');

export let theme = writable<Theme>('crimson');
export function updateTheme(newTheme: Theme) {
	theme.set(newTheme);
}
