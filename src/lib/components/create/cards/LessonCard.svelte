<script lang="ts">
	interface Props {
		title: string;
		index: number;
		image: string;
	}

	let { title, index, image }: Props = $props();
</script>

<div
	class="card border-surface-500-400-token relative flex size-60 flex-col justify-end bg-cover
  bg-center p-5 duration-500 border-token rounded-container-token hover:scale-110 sm:size-72"
	style="background-image: url({image});"
>
	<span class="absolute right-5 top-5">{index + 1}</span>
	<h1 class="h3 text-primary-500">{title}</h1>
</div>
