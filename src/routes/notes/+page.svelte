<script lang="ts">
	import MainHeader from '$lib/components/general/header/MainHeader.svelte';
	import NoteCourse from '$lib/components/notes/NoteCourse.svelte';
	import PersonalNotes from '$lib/components/notes/PersonalNotes.svelte';

	import { fly } from 'svelte/transition';
</script>

<div class="h-screen flex flex-col">
	<MainHeader />
	<main
		class="flex-grow flex overflow-hidden"
		in:fly={{ x: 100, duration: 500, delay: 500 }}
		out:fly={{ x: -100, duration: 500 }}
	>
		<div class="flex-1 h-full p-6 pt-10 overflow-y-auto">
			<section class="w-full h-auto">
				<h2 class="h2 pb-5">Notes from Coures</h2>
				<div class="flex flex-wrap gap-4">
					<NoteCourse title={'Vectors'} notes={34} />
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
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
				</div>
			</section>
			<section class="w-full h-auto pt-10">
				<h2 class="h2 pb-5">Recent Notes</h2>
				<div class="flex gap-4">
					<PersonalNotes title={'Vectors'} notes={34} />
					<PersonalNotes title={'Vectors'} notes={34} />
				</div>
			</section>
		</div>
		<div class="flex-1 border-2"></div>
	</main>
</div>
