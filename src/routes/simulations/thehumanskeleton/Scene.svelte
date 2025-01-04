<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import HumanSkeletonModel from './HumanSkeletonModel.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 3]}>
	<OrbitControls target={[0, 0, 0]} maxDistance={10} minDistance={0.3} />
</T.PerspectiveCamera>

<!-- <Grid /> -->

<T.AmbientLight position={[0, 10, 10]} intensity={1} />

<!-- <T.DirectionalLight position={[0, 10, 10]} intensity={1} /> -->
<!-- <T.DirectionalLight position={[3, -10, 0]} intensity={1} /> -->

<HumanSkeletonModel position={[0, -1, 0]} />
