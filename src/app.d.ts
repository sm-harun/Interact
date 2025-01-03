// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

type EngineSettings = {
	timeScale: number;
	timeState: boolean; // Weather it is played or not
	gravityScale: number;
	gravityX: number;
	gravityY: number;
};
