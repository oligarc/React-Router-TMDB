import CardList from "~/Components/CardLists/CardList";
import type { Route } from "./+types/home";
import type { MovieBasic } from "~/Types/interfaces";
import { getRecentMovies } from "~/Services/functions";

import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// **Loader function for React Router**
export async function loader() {
  try {
    const recentMovies: MovieBasic[] = await getRecentMovies();
    return { recentMovies: recentMovies };
  } catch (error) {
    console.error("Error fetching all Movies:", error);
    return { recentMovies: [] };
  }
}

export default function Home() {

  const loaderData : { recentMovies: MovieBasic[] } = useLoaderData();
  return <>
    <CardList movies={loaderData.recentMovies} />
  </>;
}
