import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/index.tsx",[
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("details", "routes/details.tsx"),
        route("favorites", "routes/favorites.tsx"),
        route("watchlist", "routes/watchlist.tsx"),
        route("search", "routes/search.tsx"),
        route("filter", "routes/filter.tsx"),
        route("trendingActors", "routes/trendingActors.tsx"),
    ]
)] satisfies RouteConfig;
