<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/themes';
	import { getCurrentThemeColor } from '$lib/utils';
	import { modeUserPrefers } from '@skeletonlabs/skeleton';

	let canvas: HTMLCanvasElement;
	let canvasContainer: HTMLDivElement;

	interface Props {
		position: 'bottom' | 'top';
	}

	let { position }: Props = $props();

	let waves = [
		{
			yOffset: 0,
			frequency: 0.01,
			amplitude: 30,
			speed: 5,
			fillStyle: 'yellow'
		},
		{
			yOffset: 20,
			frequency: 0.015,
			amplitude: 20,
			speed: -5,
			fillStyle: 'green'
		},
		{
			yOffset: 40,
			frequency: 0.03,
			amplitude: 8,
			speed: 10,
			fillStyle: 'red'
		}
	];

	onMount(() => {
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		function resizeCanvas() {
			canvas.width = canvasContainer.clientWidth;
			canvas.height = canvasContainer.clientHeight;
		}

		window.addEventListener('resize', resizeCanvas);

		resizeCanvas();

		let time = 0;

		let frame = 1;
		let inverted = false;

		function drawWave(
			yOffset: number,
			frequency: number,
			amplitude: number,
			speed: number,
			fillStyle: string
		) {
			ctx.beginPath();
			ctx.moveTo(0, canvas.height);

			for (let x = 0; x < canvas.width; x++) {
				let y =
					Math.sin((x + time * speed) * frequency) *
						amplitude *
						(inverted ? 3 - frame : frame) *
						0.5 +
					Math.sin((x * 0.5 + time * speed * 0.8) * frequency * 0.7) *
						amplitude *
						0.6 *
						(inverted ? 3 - frame : frame) *
						0.5 +
					Math.sin((x * 0.25 + time * speed * 1.2) * frequency * 0.5) *
						amplitude *
						0.3 *
						(inverted ? 3 - frame : frame) *
						0.5;
				ctx.lineTo(x, canvas.height / 2 + y + yOffset);
			}

			ctx.lineTo(canvas.width, canvas.height);
			ctx.closePath();
			ctx.fillStyle = fillStyle;
			ctx.fill();
		}

		function animate() {
			if (frame > 2) {
				inverted = !inverted;
				frame = 1;
			}
			frame += 0.005;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			time += 0.05;

			waves.forEach((wave) => {
				drawWave(wave.yOffset, wave.frequency, wave.amplitude, wave.speed, wave.fillStyle);
			});

			requestAnimationFrame(animate);
		}

		animate();
	});

	$effect(() => {
		$theme;

		waves[0].fillStyle = getCurrentThemeColor('surface', $modeUserPrefers ? '400' : '500');
		waves[1].fillStyle = getCurrentThemeColor('surface', $modeUserPrefers ? '300' : '600');
		waves[2].fillStyle = getCurrentThemeColor('surface', $modeUserPrefers ? '200' : '700');
	});
</script>

<div
	class="absolute w-full {position == 'bottom' ? 'bottom-full' : ''} {position == 'top'
		? 'top-full rotate-180'
		: ''} overflow-hidden"
	bind:this={canvasContainer}
>
	<canvas bind:this={canvas}></canvas>
</div>
