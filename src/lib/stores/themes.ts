import { readable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

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

export const theme = localStorageStore<Theme>('interact-theme', 'crimson');
