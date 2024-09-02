<script lang="ts">
	export let title: string;
	export let sections: Section[] = [];
	export let image: string;
</script>

<div
	class="card size-60 sm:size-72 rounded-container-token border-token border-surface-500-400-token bg-cover bg-center
  hover:scale-110 duration-500 flex flex-col justify-end p-5"
	style="background-image: url({image});"
>
	<h1 class="text-4xl text-primary-500">{title}</h1>
	<p class="mt-3">Sections: <strong class="text-primary-500">{sections.length}</strong></p>
</div>
