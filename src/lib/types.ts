export type Vector2d = {
	x: number;
	y: number;
	magnitude: number;
	dir: number;
	inputMode: 'XYZ mode' | 'Magnitude mode';
	name: string;
	color: string;
};

export type Resultant2d = {
	vectors: string[];
	scalars: number[];
	unitVectors: number[];
	resultants: string[];
	name: string;
	color: string;
	showShadows: boolean;
};

export type Vector3d = {
	x: number;
	y: number;
	z: number;
	name: string;
	color: string;
};

export type Resultant3d = {
	vectors: string[];
	scalars: number[];
	unitVectors: number[];
	resultants: string[];
	name: string;
	color: string;
	showShadows: boolean;
};
