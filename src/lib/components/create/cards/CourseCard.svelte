<script lang="ts">
	interface Props {
		doc: any;
	}

	let { doc }: Props = $props();
</script>

<div
	class="group card border-surface-500-400-token relative flex size-60 flex-col justify-end bg-cover
  bg-center p-5 duration-500 border-token rounded-container-token hover:scale-110 sm:size-72"
	style="background-image: url({doc.image});"
>
	<h1 class="text-5xl text-primary-500">{doc.title}</h1>
</div>
