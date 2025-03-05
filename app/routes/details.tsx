import { useEffect, useState } from "react";
import { useParams } from "react-router";
/*import { fetchMovieDetails } from "~/Services/functions";*/
import type { Movie } from "~/Types/interfaces";

export default function Details() {
  const { id } = useParams<{ id: string }>(); // Get movie ID from URL
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        setError("Error fetching movie details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      getMovieDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img src={movie.poster_path} alt={movie.title} className="w-full max-w-md rounded-lg mb-4" />
      <p className="text-lg mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
      <p className="text-lg"><strong>Overview:</strong> {movie.overview}</p>
    </div>
  );
}