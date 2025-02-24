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