<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import HumanSkeletonModel from './HumanSkeletonModel.svelte';
	import { theme } from '$lib/stores/themes';
	import { getCurrentThemeColor } from '$lib/utils';
	import { modeUserPrefers } from '@skeletonlabs/skeleton';

	let lightColor = $state('rgb(0, 0, 0)');

	$effect(() => {
		$theme;

		lightColor = getCurrentThemeColor('primary', '500');
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 3]}>
	<OrbitControls target={[0, 0, 0]} maxDistance={10} minDistance={0.3} />
</T.PerspectiveCamera>

<!-- <Grid /> -->

<T.AmbientLight position={[0, 10, 10]} intensity={$modeUserPrefers ? 3 : 1} />

<T.DirectionalLight
	position={[3, -10, 0]}
	color={[lightColor]}
	intensity={$modeUserPrefers ? 8 : 4}
/>

<HumanSkeletonModel position={[0, -1, 0]} />
