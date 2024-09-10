<script lang="ts">
	import { updateDoc, arrayRemove } from 'firebase/firestore';
	import { getLessonsDoc } from '$lib/docRefs';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let words: string;
	export let course: string;
	export let lesson: string;
	export let dictUpdater: number;

	let toastStore = getToastStore();

	function deleteDictionary(word: string) {
		updateDoc(getLessonsDoc(course, lesson), {
			dictionary: arrayRemove(word)
		}).then(() => {
			dictUpdater++;

			// Success Toast
			const toastSettings: ToastSettings = {
				message: `Removed ${word} from the dictionary`,
				background: `variant-filled-success`,
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(toastSettings);
		});
	}
</script>

<div class="w-full bg-secondary-400-500-token rounded-container-token p-4">
	<h1 class="text-3xl font-bold">Lesson Dictionary:</h1>

	<ul class="grid grid-cols-5 mt-3">
		{#each words as word}
			<li class="group font-bold flex gap-9 items-center">
				<span class="text-2xl">‣ {word}</span>
				<button on:click={() => deleteDictionary(word)}>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 opacity-0 group-hover:opacity-100 transition grid place-items-center"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</li>
		{/each}
	</ul>
</div>
