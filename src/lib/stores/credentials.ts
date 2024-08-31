import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export let user = writable<User | null>(null);

export function setUser(newUser: User | null) {
	user.set(newUser);
}
