<script>
	let { children } = $props();
</script>

<div
	class="physical animate-border bg-surface-100-800-token relative flex size-96 items-center justify-center hover:bg-red-100"
>
	{@render children()}
</div>

<style>
	@property --angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	.animate-border::after,
	.animate-border::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-image: conic-gradient(
			from var(--angle),
			transparent 70%,
			rgb(var(--color-primary-500))
		);
		transform: scale(1.01);
		animation: animateBorder 7s linear infinite;
	}

	.animate-border::after {
		filter: blur(2rem);
	}

	@keyframes animateBorder {
		from {
			--angle: 0deg;
		}

		to {
			--angle: 360deg;
		}
	}
</style>
