<script lang="ts">
	export let doc: any;
</script>

<div
	class="group card size-60 sm:size-72 rounded-container-token border-token border-surface-500-400-token bg-cover bg-center
  hover:scale-110 duration-500 flex flex-col justify-end p-5 relative"
	style="background-image: url({doc.image});"
>
	<h1 class="text-5xl text-primary-500">{doc.title}</h1>
</div>
