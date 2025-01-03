<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Props {
		title: string;
		lessons: number;
		subjects: string[];
		image: string;
	}

	let { title, lessons, subjects, image }: Props = $props();
</script>

<div
	class="group card border-secondary-500-400-token relative size-60 bg-cover bg-center duration-500 border-token rounded-container-token hover:scale-110 sm:size-72"
	transition:fly={{ x: 100, duration: 300 }}
>
	<div
		class="relative flex h-full w-full flex-col justify-end gap-3 bg-gradient-to-tr from-transparent from-20% to-primary-900 to-100% p-3 px-4 rounded-container-token"
	>
		<h1
			class="decoration-500-400-token ellipsis-text text-primary-900-50-token absolute bottom-5 left-5 w-4/5 text-2xl
      font-bold duration-500 group-hover:bottom-1/2
      group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:translate-y-1/2 group-hover:text-4xl"
		>
			{title}
		</h1>
		<p class="opacity-0 delay-200 duration-1000 group-hover:text-2xl group-hover:opacity-100">
			<span class="text-secondary-500-400-token"
				>Lessons:<span class="ml-2 text-primary-500">{lessons}</span>
			</span>
		</p>
		<p
			class="text-primary-400-500-token flex justify-end font-bold opacity-0 delay-300 duration-700 group-hover:text-base group-hover:opacity-100"
		>
			{#each subjects as subject}
				<span class="ml-3"><i>{subject}</i></span>
			{/each}
		</p>
	</div>
</div>
