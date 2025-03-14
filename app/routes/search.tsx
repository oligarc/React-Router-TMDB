import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import MovieCard from '~/Components/Cards/MovieCard';
import { fetchFilmsByName } from '~/Services/functions';
import type { Movie } from '~/Types/interfaces';

function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query"); // We get the 'query' from URL
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        const films = await fetchFilmsByName(searchQuery, currentPage);
        setMovies(films);
        setTotalPages(1);
      };
      fetchMovies();
    }
  }, [searchQuery, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for {searchQuery}</h1>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
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
  )
}

export default Search