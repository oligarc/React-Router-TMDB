import React, { useState } from 'react'
import type { Movie } from '~/Types/interfaces';

function MovieCard({ movie }: { movie: Movie }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // This is for the description, if the description is longer than 150 and isExpanded is false, we set it to 150 and ...
    const truncatedOverview =
      movie.overview.length > 150 && !isExpanded 
        ? movie.overview.slice(0, 150) + "..."
        : movie.overview;
  
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
            className={`mt-3 w-10 h-10 flex justify-center items-center text-white text-sm font-bold rounded-full ${
              movie.vote_average >= 7
                ? "bg-green-500"
                : movie.vote_average >= 5
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    );
  }
  
  export default MovieCard;