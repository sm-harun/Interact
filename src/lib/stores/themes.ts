import { readable, writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing'
import { getAuth } from 'firebase/auth';
import { doc, DocumentReference, getDoc, updateDoc } from 'firebase/firestore';
import { DataBase } from '$lib/firebase';
import katex from 'katex';
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

export function renderText(text: string): string {
		// This extracts text inside $
		const regex = /\$(.*?)\$/g;
		const matches = text.match(regex);
		const expressions = matches ? matches.map((m) => m.replace(/\$/g, '').trim()) : [];

		const equations: string[] = [];

		// This converts extracted text to equations and appends them to the equations array
		expressions.forEach((expression: string) => {
			equations.push(katex.renderToString(expression, { throwOnError: false }));
		});

		let newText = text;

		// Replaces the equations with their respective place
		matches?.forEach((match: string, index: number) => {
			newText = newText.replace(match, equations[index]);
		});

		return parseText(newText);
	}

// This will be used for the AI and Notes section in the courses page
export const sectionsPosition = tweened<number>(0, {
  duration: 1000,
  easing: cubicInOut
});

export function setSectionsPosition(value: number) {
  sectionsPosition.set(value);
}
