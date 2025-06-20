import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { FaPlay } from "react-icons/fa";

export const addToWatchlist = async (
  accountId: number,
  sessionId: string,
  movieId: number
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        watchlist: true,
      }),
    }
  );

  const data = await response.json();
  return data;
};


const WatchButtons: React.FC<{ trailerUrl: string | null }> = ({ trailerUrl }) => (
  <div className="flex gap-4 mt-4">
    <button className="bg-gray-600 px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer" title="Add to Watchlist">
    <GoChecklist />
    </button>
    <button className="bg-gray-600 px-4 py-2 rounded-full hover:bg-red-700 cursor-pointer" title="Add to Favorites">
    <AiFillHeart />
    </button>
    {trailerUrl && (
      <a
        href={trailerUrl}
        target="_blank"
        rel="noreferrer"
        className="text-white px-4 py-2 hover:text-gray-300 flex items-center gap-2 transition-colors"
      >
        <FaPlay /> Watch Trailer
      </a>
    )}
  </div>
);

export default WatchButtons;
