// https://easings.net

export const ease = {
	outExpo: [0.16, 1, 0.3, 1],
	outQuad: [0.5, 1, 0.89, 1],
	outQuint: [0.13, 0.71, 0.35, 1],
} as const satisfies Record<string, [number, number, number, number]>;
