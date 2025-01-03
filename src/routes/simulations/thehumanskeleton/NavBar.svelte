<script lang="ts">
	interface Props {
		camPos: (
			xPos: number,
			yPos: number,
			zPos: number,
			xCam: number,
			yCam: number,
			zCam: number
		) => void;
	}

	let { camPos }: Props = $props();

	// Status of the navbar whether it is opened or closed
	let navBarStatus = $state(true);
</script>

<div
	class="h-full w-[40rem] variant-glass-surface absolute top-0 right-0 overflow-visible transition ease-in-out duration-1000 {navBarStatus
		? ''
		: 'translate-x-full'}"
>
	<button
		class="absolute right-full top-24 variant-glass-surface px-3 py-7 rounded-l-xl"
		aria-label="hide navbar"
		onclick={() => (navBarStatus = !navBarStatus)}
	>
		<svg
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 transition {navBarStatus ? 'rotate-180' : ''}"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	</button>

	<div class="size-full overflow-y-auto p-10">
		<h1 class="h1">The Human Skeleton</h1>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(0.42, 3.31, 1.1, -2.88, 1.94, -3.88)}>The Skull</button
			>
			<p>
				This bony structure protects the brain and supports the facial structure. It consists of
				several bones fused together, including the frontal, parietal, occipital, and temporal
				bones.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() =>
					camPos(
						-0.04256517403098109,
						1.8884632943557536,
						1.4380103944402451,
						-0.037895498554093326,
						-1.36281968100475,
						-4.395510831864184
					)}>Ribcage (Thoracic Cage)</button
			>
			<p>
				Composed of ribs and the sternum, it protects the heart and lungs. There are 12 pairs of
				ribs, connected to the spine and sternum, with the lower ribs being more flexible.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(0.01710151577782377, 2.535, 1.026, -0.037, -1.362, -4.395)}
				>Clavicle (Collarbone)</button
			>
			<p>
				A long bone that runs horizontally across the front of the shoulder. It connects the arm to
				the body and helps with shoulder movement.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(-1.091, 2.612, -1.281, -0.143, -4.48, 3.152)}
				>Scapula (Shoulder Blade)</button
			>
			<p>
				A flat, triangular bone located on the upper back, aiding in shoulder movement and muscle
				attachment.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() =>
					camPos(-1.5878253642273372, 2.3502056428404976, -0.23052700054321135, 0, 0, 0)}
				>Humerus</button
			>
			<p>
				The long bone of the upper arm, running from the shoulder to the elbow. It helps form the
				ball-and-socket joint at the shoulder and the hinge joint at the elbow.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(2.821140491880763, 0.528520953490227, 0.5192174259698517, 0, 0, 0)}
				>Radius and Ulna</button
			>
			<p>
				These are the two bones of the forearm. The radius is on the thumb side, and the ulna is on
				the pinky side. Together, they allow for wrist and elbow movement.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() =>
					camPos(-0.005281986426970726, 0.3591750770339941, 1.0070987454090417, 0, 0, 0)}
				>Pelvis</button
			>
			<p>
				A large bony structure at the base of the spine, made up of the ilium, ischium, and pubis.
				It supports the weight of the upper body when sitting or standing.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(-1.291032972273586, -2.978302601995149, 0.08254831728223572, 0, 0, 0)}
				>Femur</button
			>
			<p>
				The thigh bone, which is the longest and strongest bone in the body. It runs from the hip to
				the knee.
			</p>
		</section>
		<section class="mt-4 p-5">
			<button
				class="h3 btn underline underline-offset-4"
				onclick={() => camPos(1.007026919029579, -4.858627370926829, 0.03176244191537859, 0, 0, 0)}
				>Tibia and Fibula</button
			>
			<p>
				The two bones of the lower leg. The tibia, or shinbone, is the larger and stronger of the
				two, while the fibula runs alongside it and helps stabilize the ankle.
			</p>
		</section>
	</div>
</div>
