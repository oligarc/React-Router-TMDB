import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "~/Types/interfaces";
import { fetchMovieDetails } from "~/Services/functions";

export default function Details() {
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!numericMovieId) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${numericMovieId}?api_key=YOUR_API_KEY&language=en-US`);
        if (!response.ok) throw new Error("Failed to fetch movie details");

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [numericMovieId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full md:w-1/2 rounded-lg mt-4"
      />
      <p className="mt-4">{movie.overview}</p>
      <p className="text-gray-500">Release Date: {movie.release_date}</p>
    </div>
  );
}
