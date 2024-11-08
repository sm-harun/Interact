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
	class="group card size-60 sm:size-72 rounded-container-token border-token border-secondary-500-400-token bg-cover bg-center hover:scale-110 duration-500 relative"
	transition:fly={{ x: 100, duration: 300 }}
>
	<div
		class="w-full h-full rounded-container-token bg-gradient-to-tr from-20% from-transparent to-primary-900 to-100% flex flex-col justify-end gap-3 p-3 px-4 relative"
	>
		<h1
			class="text-2xl w-4/5 font-bold decoration-500-400-token text-primary-900-50-token absolute bottom-5 left-5
      group-hover:text-4xl group-hover:bottom-1/2 group-hover:left-1/2
      group-hover:-translate-x-1/2 group-hover:translate-y-1/2 duration-500 text-overflow"
		>
			{title}
		</h1>
		<p class="opacity-0 group-hover:opacity-100 duration-1000 delay-200 group-hover:text-2xl">
			<span class="text-secondary-500-400-token"
				>Lessons:<span class="text-primary-500 ml-2">{lessons}</span>
			</span>
		</p>
		<p
			class="opacity-0 text-primary-400-500-token font-bold group-hover:opacity-100 duration-700 delay-300 group-hover:text-base flex justify-end"
		>
			{#each subjects as subject}
				<span class="ml-3"><i>{subject}</i></span>
			{/each}
		</p>
	</div>
</div>

<style>
	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 250px;
	}
</style>
