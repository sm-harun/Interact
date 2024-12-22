import { writable, type Writable } from "svelte/store";

export const bodies: Writable<Matter.Body[]> = writable([]);

