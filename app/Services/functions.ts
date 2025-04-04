import type { Actor } from "~/Types/interfaces";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;


export const fetchRecentMovies = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-EN&page=${page}`
    );
    const data = await response.json();
    
    
    return { movies: data.results, totalPages: data.total_pages };
  } catch (error) {
    console.error("Error getting the films:", error);
    return { movies: [], totalPages: 1 }; 
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
      return { movies: data.results, totalPages: data.total_pages }; // Returns movies y totalPages
    } catch (error) {
      console.error("Error fetching films by genre: ", error);
      return { movies: [], totalPages: 1 };
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
  
    
    const actorsWithDetails = await Promise.all(
      data.results.map(async (actor: any) => {
        const actorDetailsResponse = await fetch(`${BASE_URL}/person/${actor.id}?api_key=${API_KEY}`);
        const actorDetails = await actorDetailsResponse.json();
  
        return {
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
          known_for_department: actor.known_for_department,
          popularity: actor.popularity,
          birth_date: actorDetails.birthday || null,
          place_of_birth: actorDetails.place_of_birth || null,
          biography: actorDetails.biography || null, 
        };
      })
    );
  
    return {
      actors: actorsWithDetails,
      total_pages: data.total_pages,
    };
  }

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
  