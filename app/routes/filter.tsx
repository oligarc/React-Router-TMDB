import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MovieCard from "~/Components/Cards/MovieCard";
import { fetchFilmsByGenre } from "~/Services/functions"; // Función para obtener películas por género
import type { Movie } from "~/Types/interfaces";

function Filter() {
  const [searchParams] = useSearchParams(); //This is an import from react-router to get to the URL params
  const genreId = searchParams.get("genreId"); // Then here we obtain the id genre from URL
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Starts in page 1
  const [totalPages, setTotalPages] = useState(1); // Starts with 1 too, its the total page number

  // Function to manage the pages
  const handlePageChange = (page: number) => {
    setCurrentPage(page); //Updates the page
    window.scrollTo(0,0); //Scroll to the top of the page
  };

  useEffect(() => {
    if (genreId) {
      const fetchMovies = async () => {
        const { movies: films, totalPages } = await fetchFilmsByGenre(
          Number(genreId),
          currentPage
        );
        setMovies(films);
        setTotalPages(totalPages);
      };
      fetchMovies();
    }
  }, [genreId, currentPage]); // We update everytime the genreId and the page changes

  return (
    <div className="container mx-auto  max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-4">Movies by Genre</h1>
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
  );
}

export default Filter;
