
import type { MovieCardListProps } from "~/Types/interfaces";

const CardList: React.FC<MovieCardListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-3">
            <h2 className="text-lg font-bold truncate">{movie.title}</h2>
            <p className="text-sm text-gray-400 truncate">{movie.overview}</p>
            <p className="text-yellow-400 text-sm mt-2">🔥 Popularity: {movie.popularity.toFixed(1)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
