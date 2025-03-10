import React, { useEffect, useState } from 'react';
import MovieCard from '~/Components/Cards/MovieCard';
import type { Movie } from '~/Types/interfaces';

function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Obtener las películas favoritas del localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    setTotalPages(Math.ceil(storedFavorites.length / 10)); // 10 movies per page
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Slice the array to show only the movies for the current page
  const displayedMovies = favorites.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="container mx-auto  max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Favorites;
