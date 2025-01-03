<script lang="ts">
	import { updateDoc, arrayRemove } from 'firebase/firestore';
	import { getLessonsDoc } from '$lib/docRefs';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	interface Props {
		words: string;
		course: string;
		lesson: string;
		dictUpdater: number;
	}

	let { words, course, lesson, dictUpdater = $bindable() }: Props = $props();

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

<div class="bg-secondary-400-500-token w-full p-4 rounded-container-token">
	<h1 class="text-3xl font-bold">Lesson Dictionary:</h1>

	<ul class="mt-3 grid grid-cols-5">
		{#each words as word}
			<li class="group flex items-center gap-9 font-bold">
				<span class="text-2xl">‣ {word}</span>
				<button onclick={() => deleteDictionary(word)}>
					<svg
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="grid size-6 place-items-center opacity-0 transition group-hover:opacity-100"
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
