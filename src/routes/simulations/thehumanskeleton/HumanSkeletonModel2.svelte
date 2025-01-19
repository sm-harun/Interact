<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

	let { loaded = $bindable() } = $props();

	let THRELTE = useThrelte();
	let scene = THRELTE.scene;

	const loader = new OBJLoader();
	loader.load(
		'/assets/3D-models/human-skeleton-2.obj', // Path to the OBJ file
		(object) => {
			object.scale.x = 0.001;
			object.scale.y = 0.001;
			object.scale.z = 0.001;

			object.rotation.x = -(Math.PI / 2 - 0.3);

			object.castShadow = true;
			object.receiveShadow = true;

			scene.add(object);

			loaded = true;
			THRELTE.invalidate();
		}
	);
</script>
