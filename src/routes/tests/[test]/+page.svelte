<script lang="ts">
	import { page } from '$app/stores';
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { getCollNotesNote, getSectionsColl, getTestsDoc } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';
	import { getDoc } from 'firebase/firestore';
	import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
	import QuestionSection from '$lib/components/courses/Sections/QuestionSection.svelte';
	import { questionTypeSchema, trueFalseSchema, pickSchema } from '$lib/stores/courses';
	import { getDocs } from 'firebase/firestore';
	import TrueOrFalse from '$lib/components/courses/Sections/TrueOrFalse.svelte';
	import PickSection from '$lib/components/courses/Sections/PickSection.svelte';

	let test: any;
	let startingState: 'prompt' | 'loading' | 'test' = $state('prompt');
	let GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
	const genAI = new GoogleGenerativeAI(GEMINI_KEY);

	let waliaIbex = ``;

	let testContent: string[] = [];
	let settings;

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
		console.log(choices, truefalse, pick);
		const choicesModel = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			generationConfig: {
				responseMimeType: 'application/json',
				responseSchema: questionTypeSchema
			}
		});

		const trueFalseModel = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			generationConfig: {
				responseMimeType: 'application/json',
				responseSchema: trueFalseSchema
			}
		});

		const pickModel = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			generationConfig: {
				responseMimeType: 'application/json',
				responseSchema: pickSchema
			}
		});

		let res = [];

		// Create Choice questions
		for (let i = 0; i < choices; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];

			const result = await choicesModel.generateContent(
				`${text}: Generate a Choice question using the information provided and try to be unpredictable`
			);
			console.log('hello');

			res.push(JSON.parse(result.response.text()));
		}

		// Create True/False questions
		for (let i = 0; i < truefalse; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];

			const result = await trueFalseModel.generateContent(
				`${text}: Generate a True False question using the information provided and try to be unpredictable`
			);

			console.log('hello');

			res.push(JSON.parse(result.response.text()));
		}

		// Create Pick questions
		for (let i = 0; i < pick; i++) {
			let text = testContent[Math.floor(Math.random() * testContent.length)];

			const result = await pickModel.generateContent(
				`${text}: Generate a Pick type question using the information provided and try to be unpredictable`
			);
			console.log('hello');

			res.push(JSON.parse(result.response.text()));
		}

		console.log(res);

		return res;
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader showMainRoutes={false} showBackButton={true} showHomeButton={true} />
	<main class="flex-grow flex justify-center py-14 overflow-y-auto">
		{#key startingState}
			{#if startingState === 'prompt'}
				<div class="max-w-[100%] w-[70rem] h-[40rem] border-2 p-6 relative">
					<h2 class="h2">{$page.params.test}</h2>
					<hr class="my-5" />
					<button class="btn variant-filled-primary absolute bottom-5 right-5" onclick={loadTest}
						>Start Test</button
					>
				</div>
			{:else if startingState === 'test'}
				{#await createModel(settings.choices, settings.truefalse, settings.pick)}
					<p>Loading model...</p>
				{:then response}
					<div class="flex flex-col gap-5">
						{#each response as res}
							{console.log(res)}
							{#if res.type == 'TrueFalse'}
								<TrueOrFalse
									section={{
										type: 'TrueFalse',
										title: res.title,
										index: res.index,
										skip: res.skip,
										questions: res.questions,
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
				{/await}
			{/if}
		{/key}
	</main>
</div>
