<script lang="ts">
	import type * as THREE from 'three';

	import type { Snippet } from 'svelte';
	import { T, type Props } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	let {
		fallback,
		error,
		children,
		ref = $bindable(),
		...props
	}: Props<THREE.Group> & {
		ref?: THREE.Group;
		children?: Snippet<[{ ref: THREE.Group }]>;
		fallback?: Snippet;
		error?: Snippet<[{ error: Error }]>;
	} = $props();

	type GLTFResult = {
		nodes: {
			Object_9: THREE.SkinnedMesh;
			_rootJoint: THREE.Bone;
		};
		materials: {
			['Material.001']: THREE.MeshStandardMaterial;
		};
	};

	const gltf = useGltf<GLTFResult>('/assets/3D-models/human_skeleton.glb');
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Group scale={0.01}>
			<T is={gltf.nodes._rootJoint} />
			<T.SkinnedMesh
				castShadow
				receiveShadow
				geometry={gltf.nodes.Object_9.geometry}
				material={gltf.materials['Material.001']}
				skeleton={gltf.nodes.Object_9.skeleton}
			/>
		</T.Group>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
