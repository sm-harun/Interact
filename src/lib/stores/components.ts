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

// Login button Popup Store.
export const dictPopupState = writable<boolean>(false);
export const dictPopupPosition = writable<{ x: number; y: number; info: any }>({
	x: 0,
	y: 0,
	info: 'hello'
});

export function showDictPopup(e: MouseEvent, info: any) {
	dictPopupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY, info: info });
	dictPopupState.set(true);
}

export function hideDictPopup() {
	dictPopupState.set(false);
}

type Subject = 'All' | 'Math' | 'Physics' | 'Chemistry' | 'Biology';

export const subject = writable<Subject>('All');

export function setSubject(s: Subject) {
	subject.set(s);
}
