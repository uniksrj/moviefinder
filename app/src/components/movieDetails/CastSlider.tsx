import React from "react";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const CastSlider: React.FC<{ cast: CastMember[] }> = ({ cast }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Cast</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {cast.slice(0, 10).map(actor => (
          <div key={actor.id} className="w-28 shrink-0 text-center">
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              className="rounded-lg w-24 h-32 object-cover mx-auto mb-1"
              alt={actor.name}
            />
            <p className="text-sm font-medium">{actor.name}</p>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSlider;
