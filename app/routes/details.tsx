import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "~/Types/interfaces";
import { fetchMovieDetails } from "~/Services/functions";

export default function Details() {
  const { movieId } = useParams();
  const numericMovieId = Number(movieId); // Convert movieId to a number

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Get stored movies from localStorage
  const getStoredMovies = (key: string) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  // Handle add to favorites
  const handleAddToFavorites = () => {
    const favorites = getStoredMovies('favorites');
    if (isFavorite) {
      setMessage(`${movie?.title} is already in your favorites!`);
      setMessageType('error');
    } else {
      favorites.push(movie!); // Adding the current movie to favorites
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      setMessage(`${movie?.title} added to favorites!`);
      setMessageType('success');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  // Handle remove from favorites
  const handleRemoveFromFavorites = () => {
    const favorites = getStoredMovies('favorites').filter((fav: Movie) => fav.id !== movie!.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
    setMessage(`${movie?.title} removed from favorites!`);
    setMessageType('error');
    setTimeout(() => setMessage(''), 5000);
  };

  // Handle add to watchlist
  const handleAddToWatchlist = () => {
    const watchlist = getStoredMovies('watchlist');
    if (isInWatchlist) {
      setMessage(`${movie?.title} is already in your watchlist!`);
      setMessageType('error');
    } else {
      watchlist.push(movie!); // Adding the current movie to watchlist
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
      setMessage(`${movie?.title} added to watchlist!`);
      setMessageType('success');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  // Handle remove from watchlist
  const handleRemoveFromWatchlist = () => {
    const watchlist = getStoredMovies('watchlist').filter((item: Movie) => item.id !== movie!.id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsInWatchlist(false);
    setMessage(`${movie?.title} removed from watchlist!`);
    setMessageType('error');
    setTimeout(() => setMessage(''), 5000);
  };

  // Fetch movie details on load
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

        // Check if the movie is in the favorites or watchlist
        const favorites = getStoredMovies('favorites');
        const watchlist = getStoredMovies('watchlist');

        setIsFavorite(favorites.some((fav: Movie) => fav.id === movieData.id));
        setIsInWatchlist(watchlist.some((item: Movie) => item.id === movieData.id));
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
    <>
      {/* Hero section with movie poster */}
      <div className="w-full relative mb-7">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
      </div>
      <div className="container mx-auto space-y-8">


        {/* Movie details */}
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 max-w-7xl mx-auto">
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
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
            {/* Action Buttons (e.g., Add to Favorites, Add to Watchlist) */}
            <div className="flex mt-6">

              {isFavorite ? (
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 mr-4"
                  onClick={handleRemoveFromFavorites}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 mr-4"
                  onClick={handleAddToFavorites}
                >
                  Add to Favorites
                </button>
              )}

              {isInWatchlist ? (
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={handleRemoveFromWatchlist}
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={handleAddToWatchlist}
                >
                  Add to Watchlist
                </button>
              )}

            </div>
            {/* Message */}
            {message && (
              <div className={`mt-4 p-4 text-white text-center rounded-b-lg ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {message}
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
