import React, { useState } from 'react';
import type { Movie } from '~/Types/interfaces';
import Button from '../Button';

function MovieCard({ movie }: { movie: Movie }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState(''); // Estado para mostrar el mensaje

  const truncatedOverview =
    movie.overview.length > 150 && !isExpanded
      ? movie.overview.slice(0, 150) + "..."
      : movie.overview;

  const getStoredMovies = (key: string) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };

  const handleAddToFavorites = () => {
    const favorites = getStoredMovies('favorites');
    if (favorites.some((fav: Movie) => fav.id === movie.id)) {
      setMessage(`${movie.title} is already in your favorites!`);
      setTimeout(() => setMessage(''), 8000);
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setMessage(`${movie.title} added to favorites!`);
      setTimeout(() => setMessage(''), 8000);
    }
  };

  const handleAddToWatchlist = () => {
    const watchlist = getStoredMovies('watchlist');
    if (watchlist.some((item: Movie) => item.id === movie.id)) {
      setMessage(`${movie.title} is already in your watchlist!`);
      setTimeout(() => setMessage(''), 8000);
    } else {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setMessage(`${movie.title} added to watchlist!`);
      setTimeout(() => setMessage(''), 8000);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-fit object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{movie.title}</h2>
        <p className="text-sm text-gray-600 flex-grow">
          {truncatedOverview}
        </p>
        {movie.overview.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-sm mt-2 underline"
          >
            {isExpanded ? "Leer menos" : "Leer más"}
          </button>
        )}
        <div
          className={`mt-3 w-10 h-10 flex justify-center items-center text-white text-sm font-bold rounded-full ${movie.vote_average >= 7 ? "bg-green-500" : movie.vote_average >= 5 ? "bg-yellow-500" : "bg-red-500"}`}
        >
          {movie.vote_average.toFixed(1)}
        </div>

        <div className="mt-3 flex space-x-2">
          <Button
            backgroundcolor="bg-green-500"
            text="Add to favorites"
            isrounded
            onClick={handleAddToFavorites}
          />
          <Button
            backgroundcolor="bg-blue-500"
            text="Add to watchlist"
            isrounded
            onClick={handleAddToWatchlist}
          />
        </div>
      </div>

      {message && (
        <div className="p-4 text-white bg-green-500 text-center mt-4 rounded-b-lg">
          {message}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
