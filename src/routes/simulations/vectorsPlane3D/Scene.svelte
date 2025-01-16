<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75}>
	<OrbitControls target={[0, 0, 0]} maxDistance={500} minDistance={0.3} />
</T.PerspectiveCamera>

<Grid infiniteGrid={true} sectionColor={'grey'} cellColor={'grey'} fadeDistance={100} />

<T.AmbientLight position={[0, 10, 10]} intensity={1} />

<!-- <T.DirectionalLight position={[0, 10, 10]} intensity={1} /> -->
<!-- <T.DirectionalLight position={[3, -10, 0]} intensity={1} /> -->
