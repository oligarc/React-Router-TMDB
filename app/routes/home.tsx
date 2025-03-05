import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { fetchRecentMovies } from "~/Services/functions";
import type { Movie } from "~/Types/interfaces";
import MovieCard from "~/Components/Cards/MovieCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TMDB React Router APP" },
    { name: "description", content: "Welcome to our app!" },
  ];
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // We store the movies
  const [loading, setLoading] = useState<boolean>(true); // To store the loading
  const [error, setError] = useState<string | null>(null); // To manage errors
  const [currentPage, setCurrentPage] = useState(1); // Starts in page 1
  const [totalPages, setTotalPages] = useState(1); // Starts with 1 too, its the total page number

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); //Updates the page
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const { movies: films, totalPages } = await fetchRecentMovies(currentPage);
        setMovies(films);
        setTotalPages(totalPages);
      } catch (error) {
        setError("Error loading movies");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };
    fetchMovies();
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>; // Shows a loading message
  }

  if (error) {
    return <div>{error}</div>; // Shows the error message
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recent Movies</h1>
      <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
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
