
// automatically generated with generate-index.js, 
// last generated: 3/08/2025

export type RouteSection = {
    name: string;
    routes: Route[];
};

export type Route = { url: string; name: string };

export const PAGES_ROUTES: RouteSection = {
  "name": "Pages Routes",
  "routes": [
    {
      "url": "/XD/",
      "name": "Playground"
    },
    {
      "url": "/cardsElp/",
      "name": "CardsPage"
    },
    {
      "url": "/gaming/",
      "name": "GamingPage"
    },
    {
      "url": "/newui/",
      "name": "NewUIPage"
    },
    {
      "url": "/",
      "name": "Home"
    }
  ]
};

export const ROUTE_SYSTEM: RouteSection[] = [PAGES_ROUTES];