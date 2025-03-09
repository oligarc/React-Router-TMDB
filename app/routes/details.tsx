import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie, Genre } from "~/Types/interfaces";
import { fetchMovieDetails, fetchGenres } from "~/Services/functions";

export default function Details() {
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);// Convert movieId to a number

  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is required");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(numericMovieId);
        setMovie(movieData);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;


  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Hero section with movie poster */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
      </div>

      {/* Movie details */}
      <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col space-y-4 w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>
          <p className="text-lg text-gray-600">{movie.overview}</p>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">Rating:</p>
            <p className="text-xl font-bold text-green-500">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">Release Date:</p>
            <p className="text-lg text-gray-600">{movie.release_date}</p>
          </div>

          {movie.genres && movie.genres.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Genres:</h3>
                <ul className="flex space-x-4 mt-2">
                  {movie.genres.map((genre) => (
                    <li key={genre.id} className="bg-gray-500 px-3 py-1 rounded-full text-sm">
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>

      {/* Action Buttons (e.g., Add to Favorites, Add to Watchlist) */}
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Add to Watchlist
        </button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ml-4">
          Add to Favorites
        </button>
      </div>
    </div>
  );
}
