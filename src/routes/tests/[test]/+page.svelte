<script lang="ts">
	import { page } from '$app/stores';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getCollNotesNote, getSectionsColl, getTestsDoc } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';
	import { getDoc } from 'firebase/firestore';
	import { GoogleGenerativeAI } from '@google/generative-ai';
	import QuestionSection from '$lib/components/courses/Sections/QuestionSection.svelte';
	import { questionTypeSchema, trueFalseSchema, pickSchema } from '$lib/stores/courses';
	import { getDocs } from 'firebase/firestore';
	import TrueOrFalse from '$lib/components/courses/Sections/TrueOrFalse.svelte';
	import PickSection from '$lib/components/courses/Sections/PickSection.svelte';
	import { ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';

	let startingState: 'prompt' | 'loading' | 'test' = $state('prompt');
	let fetchingTestStatus = $state(false);

	let questionChoices = [0, 1, 3, 5, 8, 10];
	let timeChioces = [1, 3, 5, 10, 15, 30, 60];

	let progressBarValue = $state(0);

	// This keeps count of how to many attempt we tried at generating questions
	// It also helps us to reload and try to generate again
	let generationTrials = $state(0);

	let GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
	const genAI = new GoogleGenerativeAI(GEMINI_KEY);

	const choicesModel = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash-8b',
		generationConfig: {
			responseMimeType: 'application/json',
			responseSchema: questionTypeSchema
		}
	});

	const trueFalseModel = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash-8b',
		generationConfig: {
			responseMimeType: 'application/json',
			responseSchema: trueFalseSchema
		}
	});

	const pickModel = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash-8b',
		generationConfig: {
			responseMimeType: 'application/json',
			responseSchema: pickSchema
		}
	});

	let testContent: string[] = [];

	type Settings = {
		truefalse: 0 | 1 | 3 | 5 | 8 | 10;
		choices: 0 | 1 | 3 | 5 | 8 | 10;
		pick: 0 | 1 | 3 | 5 | 8 | 10;
		time: 1 | 3 | 5 | 10 | 15 | 30 | 60;
		showInstantAnswers: boolean;
		useCalculator: boolean;
		useAI: boolean;
		promptBeforeStart: boolean;
	};

	let settings: Settings | undefined = $state();

	$effect(() => {
		// Tests fetched
		fetchTest().then((fetchedTest) => {
			// Get the settings first
			settings = fetchedTest.settings;
			console.log(settings);

			fetchedTest.courses.forEach((course) => {
				// Gets all the sections inside the selected lessons
				course.lessons.forEach(async (lesson) => {
					// Section being fetched
					await getDocs(getSectionsColl(course.title, lesson)).then((fetchedSections) => {
						fetchedSections.forEach((section) => {
							const sectionData = section.data();

							// Gets the information part out of each text type section into the array
							switch (sectionData.type) {
								case 'Explanation':
									testContent.push(sectionData.text);
									break;
								case 'List':
									sectionData.list.forEach((text: string) => testContent.push(text));
									break;
								case 'Equation':
									sectionData.equations.forEach((text: string) => testContent.push(text));
									break;
								case 'Attention':
									testContent.push(sectionData.title);
									break;
							}
						});
					});
				});
			});

			fetchedTest.notes.forEach((noteColl) => {
				noteColl.notes.forEach((note) => {
					getDoc(getCollNotesNote($user?.uid, noteColl.title, note)).then((noteText) => {
						testContent.push(noteText.data().text);
					});
				});
			});
			fetchingTestStatus = true;
		});
	});

	async function fetchTest() {
		let fetchedTest = await getDoc(getTestsDoc($user?.uid, $page.params.test));
		return fetchedTest.data();
	}

	function loadTest() {
		startingState = 'test';
	}

	async function createModel(choices: number, truefalse: number, pick: number) {
		let res = [];

		console.log(testContent);

		// Create True/False questions
		for (let i = 0; i < truefalse; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];
			const result = await trueFalseModel.generateContent(
				`Using the text given, generate a question that is related to the text: ${text}`
			);
			progressBarValue += 1;
			res.push(JSON.parse(result.response.text()));
		}

		// Create Choice questions
		for (let i = 0; i < choices; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];
			const result = await choicesModel.generateContent(
				`Using the text given, generate a question that is related to the text: ${text}`
			);
			progressBarValue += 1;
			res.push(JSON.parse(result.response.text()));
		}

		// Create Pick questions
		for (let i = 0; i < pick; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];
			const result = await pickModel.generateContent(
				`Using the text given, generate a question that is related to the text: ${text}`
			);
			progressBarValue += 1;
			res.push(JSON.parse(result.response.text()));
		}

		return res;
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader showMainRoutes={false} showBackButton={true} showHomeButton={true} />
	<main class="flex-grow flex justify-center items-center overflow-hidden">
		{#key startingState}
			{#if startingState === 'prompt'}
				<div
					class="max-w-[100%] w-[70rem] h-[40rem] bg-surface-100-800-token rounded-container-token border-[0.1rem] border-surface-300-600-token p-10 relative"
				>
					<h2 class="h2">{$page.params.test}</h2>
					<hr class="my-5" />
					{#if fetchingTestStatus}
						<div class="w-full h-16 flex flex-col gap-4">
							<h3 class="h3">True/False</h3>
							<div class="flex gap-1">
								{#each questionChoices as choice, i}
									<button
										class="btn h-12 w-20 {settings.truefalse == choice
											? 'variant-filled-primary disabled:vaiant-filled-surface'
											: 'variant-ghost-primary disabled:varant-ghost-surface'} {i == 0
											? 'rounded-r-none'
											: ''} {i == questionChoices.length - 1 ? 'rounded-l-none' : ''} {i !== 0 &&
										i !== questionChoices.length - 1
											? 'rounded-none'
											: ''}"
										onclick={() => (settings.truefalse = choice)}
										disabled={!settings.promptBeforeStart}>{choice}</button
									>
								{/each}
							</div>
							<h3 class="h3">Choices</h3>
							<div class="flex gap-1">
								{#each questionChoices as choice, i}
									<button
										class="btn h-12 w-20 {settings.choices == choice
											? 'variant-filled-primary disabled:vaiant-filled-surface'
											: 'variant-ghost-primary disabled:varant-ghost-surface'} {i == 0
											? 'rounded-r-none'
											: ''} {i == questionChoices.length - 1 ? 'rounded-l-none' : ''} {i !== 0 &&
										i !== questionChoices.length - 1
											? 'rounded-none'
											: ''}"
										onclick={() => (settings.choices = choice)}
										disabled={!settings.promptBeforeStart}>{choice}</button
									>
								{/each}
							</div>
							<h3 class="h3">Pick</h3>
							<div class="flex gap-1">
								{#each questionChoices as choice, i}
									<button
										class="btn h-12 w-20 {settings.pick == choice
											? 'variant-filled-primary disabled:vaiant-filled-surface'
											: 'variant-ghost-primary disabled:varant-ghost-surface'} {i == 0
											? 'rounded-r-none'
											: ''} {i == questionChoices.length - 1 ? 'rounded-l-none' : ''} {i !== 0 &&
										i !== questionChoices.length - 1
											? 'rounded-none'
											: ''}"
										onclick={() => (settings.pick = choice)}
										disabled={!settings.promptBeforeStart}>{choice}</button
									>
								{/each}
							</div>
							<h3 class="h3">Test Time</h3>
							<div class="flex gap-1">
								{#each timeChioces as choice, i}
									<button
										class="btn h-12 w-20 {settings.time == choice
											? 'variant-filled-primary disabled:vaiant-filled-surface'
											: 'variant-ghost-primary disabled:varant-ghost-surface'} {i == 0
											? 'rounded-r-none'
											: ''} {i == timeChioces.length - 1 ? 'rounded-l-none' : ''} {i !== 0 &&
										i !== timeChioces.length - 1
											? 'rounded-none'
											: ''}"
										onclick={() => (settings.time = choice)}
										disabled={!settings.promptBeforeStart}>{choice}</button
									>
								{/each}
							</div>
						</div>
					{:else}
						<div
							class="place-items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2"
						>
							<ProgressRadial
								strokeLinecap={'round'}
								stroke={30}
								width={'w-10'}
								meter="stroke-primary-500"
								track="stroke-primary-500/30"
							/>
							<h3>Fetching test data...</h3>
						</div>
					{/if}
					<button
						disabled={!fetchingTestStatus}
						class="btn variant-filled-primary absolute bottom-5 right-5 disabled:bg-surface-500"
						onclick={loadTest}>Start Test</button
					>
				</div>
			{:else if startingState === 'test'}
				{#key generationTrials}
					{#await createModel(settings.choices, settings.truefalse, settings.pick)}
						<div class="w-64 flex flex-col items-center gap-2">
							<p>
								Generated Questions {progressBarValue} / {settings.choices +
									settings.truefalse +
									settings.pick}
							</p>
							<ProgressBar
								value={(progressBarValue /
									(settings.choices + settings.truefalse + settings.pick)) *
									100}
								height={'h-1'}
							/>
						</div>
					{:then response}
						<div class="size-full grid place-items-center overflow-hidden">
							<div
								class="h-full w-[60%] p-10 flex flex-col gap-5 overflow-y-auto border-x-4 border-surface-100-800-token"
							>
								{#each response as res}
									{#if res.type == 'TrueFalse'}
										<TrueOrFalse
											section={{
												type: 'TrueFalse',
												title: res.title,
												index: res.index,
												skip: res.skip,
												questions: res.statements,
												answers: res.answers
											}}
										/>
									{:else if res.type == 'Question'}
										<QuestionSection
											section={{
												type: 'Choice',
												title: res.title,
												index: res.index,
												choices: res.choices,
												answer: res.answer + 1,
												explanation: res.explanation,
												skip: res.skip
											}}
										/>
									{:else if res.type == 'Pick'}
										<PickSection
											section={{
												type: 'Pick',
												title: res.title,
												index: res.index,
												skip: res.skip,
												choices: res.choices,
												answers: res.answers
											}}
										/>
									{/if}
								{/each}
							</div>
						</div>
					{:catch}
						{(progressBarValue = 0)}
						<div class="bg-surface-200-700-token rounded-container-token p-8 px-14 box-content">
							<h3 class="h4">Failed to Generate Exam</h3>
							<div class="p-2 my-2">
								<p class="text-xl mb-1">Possible Causes:</p>
								<li>Unstable Internet connection</li>
								<li>Using a wrong version of the site</li>
								<p class="mt-1">Check console for information</p>
							</div>
							<button class="btn variant-filled-surface" onclick={() => (generationTrials += 1)}
								>Try Again!</button
							>
						</div>
					{/await}
				{/key}
			{/if}
		{/key}
	</main>
</div>
