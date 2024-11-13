<script lang="ts">
	interface Props {
		title: string;
		courses: any[];
		notes: any[];
	}

	let { title, courses, notes }: Props = $props();

	let lessonsCount = $state(0);
	let notesCount = $state(0);

	courses.forEach((course) => (lessonsCount += course.lessons.length));
	notes.forEach((note) => (notesCount += note.notes.length));
</script>

<div class="size-60 card-hover card p-5 border-2 border-primary-500 flex flex-col justify-between">
	<h3 class="h3">{title}</h3>
	<div>
		<p><strong>Lessons:</strong> {lessonsCount}</p>
		<p><strong>Notes:</strong> {notesCount}</p>
	</div>
</div>
