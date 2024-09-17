import { readable, writable } from 'svelte/store';
import { getAuth } from 'firebase/auth';
import { doc, DocumentReference, getDoc, updateDoc } from 'firebase/firestore';
import { DataBase } from '$lib/firebase';
import { marked } from 'marked';

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

export const theme = writable<Theme>('crimson');

// This one is used when the user first signs in, it doesn't require for the Data base to be updated.
export function setTheme(newTheme: Theme) {
	theme.set(newTheme);
	document.body.setAttribute('data-theme', newTheme);
}

export async function updateTheme(newTheme: Theme) {
	theme.set(newTheme);
	document.body.setAttribute('data-theme', newTheme);

	const docRef: DocumentReference = doc(DataBase, 'users', getAuth().currentUser?.uid);
	await updateDoc(docRef, {
		theme: newTheme
	});
}

// Fullscreen Store
export const fullScreenMode = writable<boolean>(false);

export function toggleFullScreen() {
	fullScreenMode.update((mode) => !mode);
}

export function parseText(text: string): string {
	return marked(text);
}
