<script lang="ts">
	export let title: string;
	export let notes: number;
</script>

<div class="card card-hover w-60 h-auto p-5 py-5 flex flex-col justify-center">
	<h2 class="h3">{title}</h2>
	<p>{notes} notes</p>
</div>
