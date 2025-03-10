import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router-dom';
import Button from '~/Components/Button';
import type { Movie } from '~/Types/interfaces';


const ActorMovies: React.FC = () => {
    const { actorId } = useParams<{ actorId: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [actorName, setActorName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [messages, setMessages] = useState<{ [key: number]: string }>({});
    const [messageType, setMessageType] = useState<{ [key: number]: 'success' | 'error' | '' }>({});
    const API_KEY = import.meta.env.VITE_API_KEY;
  
    useEffect(() => {
      const fetchMoviesAndActor = async () => {
        try {
          // Getting the actor movies
          const movieResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`);
          const movieData = await movieResponse.json();
          setMovies(movieData.cast);
  
          // Get the actor name
          const actorResponse = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`);
          const actorData = await actorResponse.json();
          setActorName(actorData.name);
  
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchMoviesAndActor();
    }, [actorId]);
  
    // Obtener películas de favoritos o watchlist desde localStorage
    const getStoredMovies = (key: string) => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    };
  
    // Agregar a favoritos
    const handleAddToFavorites = (movie: Movie) => {
      const favorites = getStoredMovies('favorites');
      const movieExists = favorites.some((fav: Movie) => fav.id === movie.id);
  
      if (movieExists) {
        // Eliminar de favoritos
        const updatedFavorites = favorites.filter((fav: Movie) => fav.id !== movie.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
        setMessages((prevMessages) => ({
          ...prevMessages,
          [movie.id]: `${movie.title} removed from favorites!`,
        }));
        setMessageType((prevType) => ({
          ...prevType,
          [movie.id]: 'success',
        }));
      } else {
        // Añadir a favoritos
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
  
        setMessages((prevMessages) => ({
          ...prevMessages,
          [movie.id]: `${movie.title} added to favorites!`,
        }));
        setMessageType((prevType) => ({
          ...prevType,
          [movie.id]: 'success',
        }));
      }
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages };
          delete newMessages[movie.id]; // Eliminar el mensaje después de 5 segundos
          return newMessages;
        });
      }, 5000);
    };
  
    // Add or remove from watchlist
    const handleAddToWatchlist = (movie: Movie) => {
      const watchlist = getStoredMovies('watchlist');
      const movieExists = watchlist.some((item: Movie) => item.id === movie.id);
  
      if (movieExists) {
        // Remove from watchlist
        const updatedWatchlist = watchlist.filter((item: Movie) => item.id !== movie.id);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  
        setMessages((prevMessages) => ({
          ...prevMessages,
          [movie.id]: `${movie.title} removed from watchlist!`,
        }));
        setMessageType((prevType) => ({
          ...prevType,
          [movie.id]: 'success',
        }));
      } else {
        // Add to watchlist
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
  
        setMessages((prevMessages) => ({
          ...prevMessages,
          [movie.id]: `${movie.title} added to watchlist!`,
        }));
        setMessageType((prevType) => ({
          ...prevType,
          [movie.id]: 'success',
        }));
      }
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = { ...prevMessages };
          delete newMessages[movie.id];
          return newMessages;
        });
      }, 5000);
    };
  
    if (loading) {
      return <div className="text-center text-xl">Loading...</div>;
    }
  
    return (
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Movies of {actorName}</h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => {
              const isInFavorites = getStoredMovies('favorites').some((fav: Movie) => fav.id === movie.id);
              const isInWatchlist = getStoredMovies('watchlist').some((item: Movie) => item.id === movie.id);
  
              return (
                <div key={movie.id} className="movie-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <Link to={`/movie/${movie.id}`} className="block text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                    <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-fit object-cover"
                  />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                    <p className="text-sm text-gray-600">
                      {movie.release_date} - {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600 flex-grow">
                      {movie.overview.length > 150
                        ? movie.overview.slice(0, 150) + '...'
                        : movie.overview}
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <Button
                        backgroundcolor={isInFavorites ? 'bg-red-500' : 'bg-green-500'}
                        text={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                        isrounded
                        onClick={() => handleAddToFavorites(movie)}
                      />
                      <Button
                        backgroundcolor={isInWatchlist ? 'bg-red-500' : 'bg-blue-500'}
                        text={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                        isrounded
                        onClick={() => handleAddToWatchlist(movie)}
                      />
                    </div>
  
                    
                    {messages[movie.id] && (
                      <div
                        className={`p-4 text-white text-center mt-4 rounded-b-lg ${messageType[movie.id] === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                      >
                        {messages[movie.id]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No movies found for this actor.</p>
        )}
      </div>
    );
};

export default ActorMovies;

