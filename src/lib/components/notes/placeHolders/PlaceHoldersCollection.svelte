<script lang="ts">
	import PersonalNotesPlaceHolder from './PersonalNotesPlaceHolder.svelte';
	import NoteCoursePlaceHolder from './NoteCoursePlaceHolder.svelte';
</script>

<section class="h-auto w-full">
	<h2 class="h2 pb-5">Course Notes</h2>
	<div class="flex flex-wrap gap-4">
		<NoteCoursePlaceHolder />
		<NoteCoursePlaceHolder />
		<NoteCoursePlaceHolder />
		<NoteCoursePlaceHolder />
	</div>
</section>

<!-- Personal Notes Place Holder -->
<section class="h-auto w-full pt-10">
	<h2 class="h2 pb-5">Personal Notes</h2>
	<div class="grid grid-cols-3 gap-4">
		<PersonalNotesPlaceHolder />
		<PersonalNotesPlaceHolder />
		<PersonalNotesPlaceHolder />
		<PersonalNotesPlaceHolder />
	</div>
</section>
