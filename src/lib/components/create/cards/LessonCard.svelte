<script lang="ts">
	export let title: string;
	export let index: number;
	export let image: string;
</script>

<div
	class="card size-60 sm:size-72 rounded-container-token border-token border-surface-500-400-token bg-cover bg-center
  hover:scale-110 duration-500 flex flex-col justify-end p-5 relative"
	style="background-image: url({image});"
>
	<span class="absolute top-5 right-5">{index + 1}</span>
	<h1 class="h3 text-primary-500">{title}</h1>
</div>
