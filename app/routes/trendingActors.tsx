import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { fetchTrendingActors } from '~/Services/functions';
import ActorCard from '~/Components/Cards/ActorCard';
import type { Actor } from '~/Types/interfaces';

function TrendingActors() {
  const [actors, setActors] = useState<Actor[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const { actors: fetchedActors, total_pages } = await fetchTrendingActors(currentPage);
        setActors(fetchedActors);
        setTotalPages(total_pages);
      } catch (error) {
        console.error("Error fetching trending actors:", error);
      }
    };

    fetchActors();
  }, [currentPage]); 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container  max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Actors</h1>
      {actors.length === 0 ? (
        <p>No actors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {actors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
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

export default TrendingActors;

