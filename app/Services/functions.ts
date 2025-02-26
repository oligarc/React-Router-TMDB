import type { MovieBasic, MovieListResponse } from "~/Types/interfaces";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      console.log("FETCH" +data)
      return data.genres; // Its gonna return a list of genres with an id and a name
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  export async function getRecentMovies(): Promise<MovieBasic[]> {
    try {
      const response: Response = await fetch(`${BASE_URL}?sort_by=release_date.desc`);
  
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recent movies: ${response.status} ${response.statusText}`
        );
      }
  
      const data: MovieListResponse = await response.json();
      console.log("Fetched recent movies:", data.results);
      return data.results;
    } catch (error) {
      console.error("Error fetching recent movies:", error);
      return []; // Return an empty array in case of failure
    }
  }

  export async function getMoviesByName(query: string | undefined): Promise<MovieBasic[] | null> {
    try {
      if (!query) return null; 
  
      const response: Response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
      );
  
      if (!response.ok) {
        throw new Error(
          `Movie search failed for "${query}": ${response.status} ${response.statusText}`
        );
      }
  
      const data = await response.json();
      console.log(`Fetched movies for query: "${query}"`, data.results);
      return data.results;
    } catch (error) {
      console.error(`Error searching for movies with query "${query}":`, error);
      return null;
    }
  }