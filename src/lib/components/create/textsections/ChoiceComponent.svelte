<script lang="ts">
	import { updateDoc } from 'firebase/firestore';
	import { getSectionsDoc } from '$lib/docRefs';
	import { afterUpdate, onMount } from 'svelte';

	export let section: ChoiceSection;
	export let course: string;
	export let lesson: string;

	let sectionChoices = section.choices;
	let sectionTitle = section.title;

	let buttonSynced = true;
	let updater = 0;

	let oldChoices: string[];
	let oldTitle: string;
	onMount(() => {
		oldChoices = [...sectionChoices];
		oldTitle = sectionTitle;
	});

	$: checkIfChanged(sectionTitle, oldTitle, sectionChoices, oldChoices);

	const compareArrays = (a: string[], b: string[]) => {
		return JSON.stringify(a) !== JSON.stringify(b);
	};

	function checkIfChanged(
		newTitle: string,
		oTitle: string,
		newChoices: string[],
		oChoices: string[]
	) {
		if (newTitle !== oTitle || compareArrays(newChoices, oChoices)) {
			buttonSynced = false;
		} else {
			buttonSynced = true;
		}
	}

	function addChoice() {
		sectionChoices.push('');
		updater++;
	}

	function deleteChoice(index: number) {
		sectionChoices.splice(index, 1);
		updater++;
	}

	function syncSection() {
		updateDoc(getSectionsDoc(course, lesson, section.title), {
			choices: sectionChoices,
			title: sectionTitle
		}).then(() => {
			oldChoices = [...sectionChoices];
			oldTitle = sectionTitle;
		});
	}
</script>

<div class="w-full variant-filled-surface rounded-container-token p-4 relative">
	<label class="label">
		<strong>Question: </strong>
		<input
			class="input variant-filled-surface font-bold"
			type="text"
			placeholder="Question"
			bind:value={sectionTitle}
		/>

		<div class="ml-7">
			{#key updater}
				{#each sectionChoices as choice, i}
					<strong>Choice {i + 1}: </strong>
					<div class="flex items-center gap-4 px-5">
						<input
							class="input variant-filled-surface"
							type="text"
							placeholder="Choice {i + 1}"
							bind:value={choice}
						/>
						<button on:click={() => deleteChoice(i)}>
							<svg
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-8 active:scale-110 transition"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
								/>
							</svg>
						</button>
					</div>
				{/each}
			{/key}
		</div>
	</label>
	<div class="w-full flex items-center justify-between mt-5">
		<button class="btn variant-ringed-primary hover:variant-filled-primary" on:click={addChoice}>
			<span>Add Choice</span>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
		<button
			class="{buttonSynced ? 'variant-ringed-primary' : 'variant-filled-primary'} btn"
			on:click={syncSection}
		>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
				/>
			</svg>
			<span class="hidden lg:flex">Sync</span>
		</button>
	</div>
</div>
