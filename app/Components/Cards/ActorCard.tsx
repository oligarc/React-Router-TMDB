import React from 'react';
import type { ActorCardProps } from '~/Types/interfaces';


const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  return (
    <div className="card p-4 border rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h3 className="text-xl font-semibold mt-2">{actor.name}</h3>
      <p>{actor.known_for_department}</p>
    </div>
  );
};

export default ActorCard;
