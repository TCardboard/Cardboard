// automatically generated with generate-index.js,
// last generated: 1/08/2025

export type RouteSection = {
	name: string;
	routes: Route[];
};

export type Route = { url: string; name: string };

export const PAGES_ROUTES: RouteSection = {
	name: "Pages Routes",
	routes: [
		{
			url: "/",
			name: "Home",
		},
	],
};

export const ROUTE_SYSTEM: RouteSection[] = [PAGES_ROUTES];
