import React, { useEffect, useState } from 'react';
import type { Movie } from '~/Types/interfaces';
import Button from '../Button';
import { Link } from 'react-router';

function MovieCard({ movie }: { movie: Movie }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const favorites = getStoredMovies('favorites');
    const watchlist = getStoredMovies('watchlist');

    setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
    setIsInWatchlist(watchlist.some((item: Movie) => item.id === movie.id));
  }, []);

  const getStoredMovies = (key: string) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const handleAddToFavorites = () => {
    const favorites = getStoredMovies('favorites');
    if (isFavorite) {
      setMessage(`${movie.title} is already in your favorites!`);
      setMessageType('error');
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      setMessage(`${movie.title} added to favorites!`);
      setMessageType('success');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  const handleRemoveFromFavorites = () => {
    const favorites = getStoredMovies('favorites').filter((fav: Movie) => fav.id !== movie.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(false);
    setMessage(`${movie.title} removed from favorites!`);
    setMessageType('error');
    setTimeout(() => setMessage(''), 5000);
  };

  const handleAddToWatchlist = () => {
    const watchlist = getStoredMovies('watchlist');
    if (isInWatchlist) {
      setMessage(`${movie.title} is already in your watchlist!`);
      setMessageType('error');
    } else {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
      setMessage(`${movie.title} added to watchlist!`);
      setMessageType('success');
    }
    setTimeout(() => setMessage(''), 5000);
  };

  const handleRemoveFromWatchlist = () => {
    const watchlist = getStoredMovies('watchlist').filter((item: Movie) => item.id !== movie.id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsInWatchlist(false);
    setMessage(`${movie.title} removed from watchlist!`);
    setMessageType('error');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <Link to={`/movie/${movie.id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-fit object-cover"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/movie/${movie.id}`} className="block text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
          {movie.title}
        </Link>
        <p className="text-sm text-gray-600 flex-grow">
          {movie.overview.length > 150 && !isExpanded
            ? movie.overview.slice(0, 150) + "..."
            : movie.overview}
        </p>
        {movie.overview.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-sm mt-2 underline"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
        <div
          className={`mt-3 w-10 h-10 flex justify-center items-center text-white text-sm font-bold rounded-full ${movie.vote_average >= 7
            ? "bg-green-500"
            : movie.vote_average >= 5
              ? "bg-yellow-500"
              : "bg-red-500"
            }`}
        >
          {movie.vote_average.toFixed(1)}
        </div>

        <div className="mt-3 flex space-x-2">
          {isFavorite ? (
            <Button backgroundcolor="bg-red-500" text="Remove from favorites" isrounded onClick={handleRemoveFromFavorites}/>
          ) : (
            <Button backgroundcolor="bg-green-500" text="Add to favorites" isrounded onClick={handleAddToFavorites} />
          )}

          {isInWatchlist ? (
            <Button backgroundcolor="bg-red-500" text="Remove from watchlist" isrounded onClick={handleRemoveFromWatchlist} />
          ) : (
            <Button backgroundcolor="bg-blue-500" text="Add to watchlist" isrounded onClick={handleAddToWatchlist}  />
          )}
        </div>
      </div>

      {message && (
        <div className={`p-4 text-white text-center mt-4 rounded-b-lg ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
