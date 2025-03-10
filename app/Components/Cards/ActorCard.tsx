import React, { useState } from 'react';
import { Link } from 'react-router';
import type { ActorCardProps } from '~/Types/interfaces';


const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <Link to={`/actor/${actor.id}`} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          className="w-full h-100 object-cover rounded-lg"
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          to={`/actor/${actor.id}`}
          className="block text-2xl font-semibold text-gray-800 hover:text-blue-500 transition"
        >
          {actor.name}
        </Link>

        <div className="mt-3 text-gray-700">
          <p className="text-sm"><strong>Birth date:</strong> {actor.birth_date || 'No disponible'}</p>
          <p className="text-sm"><strong>Birth place:</strong> {actor.place_of_birth || 'No disponible'}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
