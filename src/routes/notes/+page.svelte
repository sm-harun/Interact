<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NoteCourse from '$lib/components/notes/NoteCourse.svelte';
	import NotesCard from '$lib/components/notes/NoteCard.svelte';
	import PersonalNotes from '$lib/components/notes/PersonalNotes.svelte';

	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { fly } from 'svelte/transition';

	let right = tweened(0, {
		duration: 1000,
		easing: cubicInOut
	});

	function transitionPlane() {
		if ($right == 0) right.set(100);
		if ($right == 100) right.set(0);
	}
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow flex overflow-hidden"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<div class="flex-1 h-full overflow-hidden relative">
			<!-- This is the section that displays all the notes collection -->
			<div class="size-full p-6 pt-10 absolute overflow-y-auto" style="right: {$right}%;">
				<section class="w-full h-auto">
					<h2 class="h2 pb-5">Notes from Coures</h2>
					<div class="flex flex-wrap gap-4">
						<NoteCourse title={'Vectors'} notes={34} todo={transitionPlane} />
						<NoteCourse title={'Enzymes'} notes={40} todo={transitionPlane} />
						<NoteCourse title={'Motion'} notes={10} todo={transitionPlane} />
						<div
							class="w-96 h-24 flex justify-around items-center variant-glass-secondary rounded-container-token"
						>
							<div class="gap-2 flex flex-col">
								<div class="w-20 h-3 bg-surface-400 animate-pulse rounded-full"></div>
								<div class="w-20 h-3 bg-surface-400 animate-pulse rounded-full"></div>
							</div>
							<div class="w-20 h-2 bg-surface-400 animate-pulse rounded-full"></div>
						</div>
					</div>
				</section>
				<section class="w-full h-auto pt-10">
					<h2 class="h2 pb-5">Personal Notes</h2>
					<div class="flex flex-wrap gap-4">
						<PersonalNotes title={'Vectors'} notes={34} todo={transitionPlane} />
						<PersonalNotes title={'Enzyme'} notes={40} todo={transitionPlane} />
						<PersonalNotes title={'Motion'} notes={10} todo={transitionPlane} />
						<PersonalNotes title={'Enzyme'} notes={40} todo={transitionPlane} />
						<PersonalNotes title={'Motion'} notes={10} todo={transitionPlane} />
						<PersonalNotes title={'Vectors'} notes={34} todo={transitionPlane} />
						<PersonalNotes title={'Enzyme'} notes={40} todo={transitionPlane} />
						<PersonalNotes title={'Motion'} notes={10} todo={transitionPlane} />
					</div>
				</section>
				<section class="w-full h-auto pt-10">
					<h2 class="h2 pb-5">Recent Notes</h2>
					<div class="flex gap-4">
						<PersonalNotes title={'Vectors'} notes={34} todo={transitionPlane} />
						<PersonalNotes title={'Motion'} notes={34} todo={transitionPlane} />
						<PersonalNotes title={'Vectors'} notes={34} todo={transitionPlane} />
					</div>
				</section>
			</div>

			<!-- This is the section that slides in displays notes on the selected collection -->
			<div class="size-full flex flex-col overflow-y-auto absolute" style="left: {100 - $right}%">
				<header class="p-5 px-5 flex-shrink-0 w-full">
					<button class="active:scale-90 transition" on:click={transitionPlane}>
						<svg
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-9 mr-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
							/>
						</svg>
					</button>
				</header>
				<div class="w-full flex-grow flex flex-wrap content-start gap-6 p-5">
					<NotesCard
						title={'Introduction'}
						text={'lorem sda jdlk jakdj lkjaiojf a;lksd ;fkasdj ;lkasdjoi jad;iosf jalk;dsj iofkasd;kl jf;akldsj piofj'}
					/>
					<NotesCard
						title={'Addition'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Subtraction'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Multiplication'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Division'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Introduction'}
						text={'lorem sda jdlk jakdj lkjaiojf a;lksd ;fkasdj ;lkasdjoi jad;iosf jalk;dsj iofkasd;kl jf;akldsj piofj'}
					/>
					<NotesCard
						title={'Addition'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Subtraction'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Multiplication'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Division'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Introduction'}
						text={'lorem sda jdlk jakdj lkjaiojf a;lksd ;fkasdj ;lkasdjoi jad;iosf jalk;dsj iofkasd;kl jf;akldsj piofj'}
					/>
					<NotesCard
						title={'Addition'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Subtraction'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Multiplication'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Division'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Introduction'}
						text={'lorem sda jdlk jakdj lkjaiojf a;lksd ;fkasdj ;lkasdjoi jad;iosf jalk;dsj iofkasd;kl jf;akldsj piofj'}
					/>
					<NotesCard
						title={'Addition'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Subtraction'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Multiplication'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
					<NotesCard
						title={'Division'}
						text={'aa k;djf;klasjd iofjasd;li fj;sklad jfa k;djf;klasjd  iofjasd;li fj;sklad jfa k;djf;klasjd iiofjasdiofjasdiofjasdofjasd;li fj iofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fjiofjasd;li fj;sklad jfa k;djf;klasjd iofjasd;li fj;sklad jf k;djf;klasjd iofjasd;li fj;sklad jf'}
					/>
				</div>
			</div>
		</div>
		<div class="flex-1 h-full border-l-2 border-primary-500 flex flex-col">
			<input class="input rounded-none border-none !bg-transparent px-10 h-40 h1 flex-shrink-0" />
			<hr class="mx-4 mb-8" />
			<textarea class="textarea border-none p-5 px-5 !bg-transparent flex-grow text-xl" />
		</div>
	</main>
</div>
