import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

// Themes Popup Store
export const themesPopupState = writable<boolean>(false);
export const popupPosition = writable<{ x: number; y: number }>({ x: 0, y: 0 });

export function showThemesPopup(e: MouseEvent) {
	popupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY });
	themesPopupState.set(true);
}

export function hideThemesPopup() {
	themesPopupState.set(false);
}

// Profile Icon Popup Store
export const profilePopupState = writable<boolean>(false);
export const profilePopupPosition = writable<{ x: number; y: number }>({
	x: 0,
	y: 0
});

export function showProfilePopup(e: MouseEvent) {
	profilePopupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY });
	profilePopupState.set(true);
}

export function hideProfilePopup() {
	profilePopupState.set(false);
}

// Login button Popup Store.
export const loginPopupState = writable<boolean>(false);
export const loginPopupPosition = writable<{ x: number; y: number }>({ x: 0, y: 0 });

export function showLoginPopup(e: MouseEvent) {
	loginPopupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY });
	loginPopupState.set(true);
}

export function hideLoginPopup() {
	loginPopupState.set(false);
}

// Fullscreen Store
export const fullScreenMode = writable<boolean>(false);

export function toggleFullScreen() {
	fullScreenMode.update((mode) => !mode);
}

type SectionFunc = (result: string) => void;

// Adding lesson Section Store.
export const sectionPopupState = writable<boolean>(false);
export const sectionPopupPosition = writable<{
	x: number;
	y: number;
	callback: SectionFunc;
}>({ x: 0, y: 0, callback: (result) => {} });

export function showSectionPopup(e: MouseEvent, callback: SectionFunc) {
	sectionPopupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY, callback: callback });
	sectionPopupState.set(true);
}

export function hideSectionPopup() {
	sectionPopupState.set(false);
}

type subject =
	| 'all'
	| 'math'
	| 'computer science'
	| 'physics'
	| 'chemistry'
	| 'biology'
	| 'english'
	| 'history'
	| 'geography'
	| 'politics'
	| 'art'
	| 'music'
	| 'sport'
	| 'other';

export const subject = writable<subject>('all');

export function setSubject(s: subject) {
	subject.set(s);
}
