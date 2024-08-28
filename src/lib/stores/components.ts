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
export const profilePopupPosition = writable<{ x: number; y: number; user?: User | null }>({
	x: 0,
	y: 0
});

export function showProfilePopup(e: MouseEvent, user: User) {
	profilePopupPosition.set({ x: window.innerWidth - e.clientX, y: e.clientY, user: user });
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
