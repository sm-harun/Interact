<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import { fly } from 'svelte/transition';
	import TestCard from './TestCard.svelte';

	import { getTestsColl } from '$lib/docRefs';
	import { user } from '$lib/stores/credentials';
	import { getDocs } from 'firebase/firestore';

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

	type Test = {
		title: string;
		courses: { title: string; type: 'course'; lessons: string[] }[];
		notes: { title: string; type: 'notes'; notes: string[] }[];
		settings: Settings;
	};

	let tests: Test[] = $state([]);

	$effect(() => {
		getTests().then((fetchedTests) => {
			tests = fetchedTests;
		});
	});

	async function getTests() {
		let fetchedQuery = await getDocs(getTestsColl($user.uid));

		let fetchedTests: any = [];
		fetchedQuery.forEach((test) => fetchedTests.push(test.data()));

		return fetchedTests;
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow p-6 overflow-y-auto overflow-x-hidden"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<h1 class="h1 mb-3 bg-transparent">All Tests</h1>
		<div class="p-3 flex gap-4 flex-wrap">
			<a
				class="card card-hover variant-ghost-primary size-60 grid place-items-center"
				aria-label="Add Test Button"
				href="/tests/create-test"
			>
				<svg
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-[50%] aspect-square"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
			</a>
			{#each tests as test}
				<TestCard title={test.title} courses={test.courses} notes={test.notes} />
			{/each}
		</div>
	</main>
</div>
