import type { Actor } from "~/Types/interfaces";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchRecentMovies = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-EN&page=${page}`
    );
    const data = await response.json();
    
    // Devuelve tanto los resultados como el total de páginas
    return { movies: data.results, totalPages: data.total_pages };
  } catch (error) {
    console.error("Error getting the films:", error);
    return { movies: [], totalPages: 1 }; // En caso de error, devuelve un arreglo vacío y 1 página
  }
};



export const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-EN`
      );
      const data = await response.json();
      console.log("FETCH" +data)
      return data.genres; // Its gonna return a list of genres with an id and a name
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  export const fetchFilmsByGenre = async (genreId: number, page: number = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-EN&page=${page}`
      );
      const data = await response.json();
      return { movies: data.results, totalPages: data.total_pages }; // Retorna movies y totalPages
    } catch (error) {
      console.error("Error fetching films by genre: ", error);
      return { movies: [], totalPages: 1 }; // Retorna valores por defecto en caso de error
    }
  };

  export const fetchFilmsByName = async (searchType : string, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchType}&language=en-EN&page=${page}`
      );
      const data = await response.json();
      console.log(data);
      return data.results;
    } catch (error) {
      console.error("Error getting the films; ", error);
    }
  };

  export async function fetchTrendingActors(page: number): Promise<{ actors: Actor[], total_pages: number }> {
    const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    return {
      actors: data.results,
      total_pages: data.total_pages
    };
  }

  /*export const fetchMovieDetails = async (movieId: number): Promise<any> => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`; // URL to fetch movie details
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
  
    return await response.json(); // Return the fetched movie details
  };*/
  export const fetchMovieDetails = async (movieId: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      console.log("Movie Data:", data); // Log the movie data here
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  