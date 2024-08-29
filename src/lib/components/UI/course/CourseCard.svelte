<script lang="ts">
	export let title: string;
	export let lessons: string[];
	export let subjects: string;
	export let image: string;
</script>

<div
	class="group card size-60 sm:size-72 rounded-container-token border-token border-secondary-500-400-token bg-cover bg-center hover:scale-110 duration-500"
	style="background-image: url({image});"
>
	<div
		class="w-full h-full rounded-container-token bg-gradient-to-t from-surface-900/90 from-20% to-transparent to-100% flex flex-col justify-end p-3 relative"
	>
		<h1
			class="text-5xl font-bold decoration-500-400-token text-primary-500-400-token absolute bottom-5 left-5
      group-hover:text-6xl xl:group-hover:text-8xl group-hover:bottom-1/2 group-hover:left-1/2
      group-hover:-translate-x-1/2 group-hover:translate-y-1/2 duration-500"
		>
			{title}
		</h1>
		<p class="opacity-0 group-hover:opacity-100 duration-1000 delay-200 group-hover:text-2xl">
			<span class="text-secondary-500-400-token"
				>Lessons:<span class="text-primary-500 ml-2">{lessons.length}</span>
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
