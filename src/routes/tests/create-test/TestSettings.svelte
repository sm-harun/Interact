<script lang="ts">
	interface Props {
		filterChecked: () => void;
		createTest: () => void;
		truefalse: 0 | 1 | 3 | 5 | 8 | 10;
		choices: 0 | 1 | 3 | 5 | 8 | 10;
		pick: 0 | 1 | 3 | 5 | 8 | 10;
		time: 1 | 3 | 5 | 10 | 15 | 30 | 60;
		showAnswerInstantly: boolean;
		useCalculator: boolean;
		useAI: boolean;
		promptBeforeStart: boolean;
	}

	let {
		filterChecked,
		createTest,
		truefalse = $bindable(),
		choices = $bindable(),
		pick = $bindable(),
		time = $bindable(),
		showAnswerInstantly = $bindable(),
		useCalculator = $bindable(),
		useAI = $bindable(),
		promptBeforeStart = $bindable()
	}: Props = $props();

	let questionChoices = [0, 1, 3, 5, 8, 10];
	let timeChioces = [1, 3, 5, 10, 15, 30, 60];

	function changeNumberSetting(property: string, value: number) {
		switch (property) {
			case 'truefalse':
				truefalse = value as 0 | 1 | 3 | 5 | 8 | 10;
				break;
			case 'choices':
				choices = value as 0 | 1 | 3 | 5 | 8 | 10;
				break;
			case 'pick':
				pick = value as 0 | 1 | 3 | 5 | 8 | 10;
				break;
			case 'time':
				time = value as 1 | 3 | 5 | 10 | 15 | 30 | 60;
				break;
		}
	}
</script>

<section class="flex-[2_1_0] border-surface-500 border-l-2 p-8 relative">
	<h1 class="h1">Test Settings</h1>
	<hr class="my-5 opacity-0" />

	<h2 class="h2 flex">Questions</h2>
	<hr class="my-5" />

	<h3 class="h3">True or False</h3>
	<div class="w-full h-16 flex p-3 box-content gap-1">
		{#each questionChoices as choice, i}
			<button
				class="btn h-12 w-20 {truefalse == choice
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} {i == 0 ? 'rounded-r-none' : ''} {i ==
				questionChoices.length - 1
					? 'rounded-l-none'
					: ''} {i !== 0 && i !== questionChoices.length - 1 ? 'rounded-none' : ''}"
				onclick={() => changeNumberSetting('truefalse', choice)}>{choice}</button
			>
		{/each}
	</div>
	<h3 class="h3 mt-3">Choices</h3>
	<div class="w-full h-16 flex p-3 box-content gap-1">
		{#each questionChoices as choice, i}
			<button
				class="btn {choices == choice
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} h-12 w-20 {i == 0 ? 'rounded-r-none' : ''} {i ==
				questionChoices.length - 1
					? 'rounded-l-none'
					: ''} {i !== 0 && i !== questionChoices.length - 1 ? 'rounded-none' : ''}"
				onclick={() => changeNumberSetting('choices', choice)}>{choice}</button
			>
		{/each}
	</div>
	<h3 class="h3 mt-3">Pick Choices</h3>
	<div class="w-full h-16 flex p-3 box-content gap-1">
		{#each questionChoices as choice, i}
			<button
				class="btn {pick == choice
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} h-12 w-20 {i == 0 ? 'rounded-r-none' : ''} {i ==
				questionChoices.length - 1
					? 'rounded-l-none'
					: ''} {i !== 0 && i !== questionChoices.length - 1 ? 'rounded-none' : ''}"
				onclick={() => changeNumberSetting('pick', choice)}>{choice}</button
			>
		{/each}
	</div>

	<h2 class="h2 flex mt-10">Time in minutes</h2>
	<hr class="my-5" />
	<div class="w-full h-16 flex p-3 box-content gap-1">
		{#each timeChioces as choice, i}
			<button
				class="btn {time == choice
					? 'variant-filled-primary'
					: 'variant-ghost-primary'} h-12 w-20 {i == 0 ? 'rounded-r-none' : ''} {i ==
				timeChioces.length - 1
					? 'rounded-l-none'
					: ''} {i !== 0 && i !== timeChioces.length - 1 ? 'rounded-none' : ''}"
				onclick={() => changeNumberSetting('time', choice)}>{choice}</button
			>
		{/each}
	</div>

	<h2 class="h2 flex mt-10">More Settings</h2>
	<hr class="my-5" />
	<div class="w-full h-16 flex p-3 box-content gap-3">
		<button
			class="btn {showAnswerInstantly ? 'variant-filled-primary' : 'variant-ghost-primary'} h-12"
			onclick={() => (showAnswerInstantly = !showAnswerInstantly)}>Show Answer Instantly</button
		>
		<button
			class="btn h-12 {useCalculator ? 'variant-filled-primary' : 'variant-ghost-primary'}"
			onclick={() => (useCalculator = !useCalculator)}>Use Calculator</button
		>
		<button
			class="btn h-12 {useAI ? 'variant-filled-primary' : 'variant-ghost-primary'}"
			onclick={() => (useAI = !useAI)}>Use AI</button
		>
		<button
			class="btn h-12 {promptBeforeStart ? 'variant-filled-primary' : 'variant-ghost-primary'}"
			onclick={() => (promptBeforeStart = !promptBeforeStart)}>Prompt Before Start</button
		>
	</div>

	<button class="btn variant-filled-primary absolute bottom-5 right-5" onclick={createTest}
		>Create Test</button
	>
</section>
