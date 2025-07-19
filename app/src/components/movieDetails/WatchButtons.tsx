import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { redirectToTMDBLogin } from "~/src/lib/Tmdblogin";

export const updateUserMediaStatus = async (
  action: "favorite" | "watchlist",
  accountId: number,
  sessionId: string,
  mediaId: number,
  mediaType: "movie" | "tv",
  value: boolean
) => {
  const url = `https://api.themoviedb.org/3/account/${accountId}/${action}?session_id=${sessionId}`;
  const body = {
    media_type: mediaType,
    media_id: mediaId,
    [action]: value,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};

interface WatchButtonsProps {
  trailerUrl: string | null;
  id: string | number;
  mediaType: "movie" | "tv";
}

const WatchButtons: React.FC<WatchButtonsProps> = ({ trailerUrl, id, mediaType }) => {
  const [sessionId] = useState<string | null>(localStorage.getItem('tmdb_session'));
  const [accountId] = useState<number | null>(() => {
    const userStr = localStorage.getItem('tmdb_user');
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      return user.id ?? null;
    } catch (e) {
      console.error('Failed to parse tmdb_user from localStorage', e);
      return null;
    }
  });

  const [isFav, setIsFav] = useState<boolean | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean | null>(null);

  // Check favorite status on mount
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!accountId || !sessionId) return;

      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/account_states?session_id=${sessionId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      setIsFav(data.favorite);
    };

    checkIfFavorite();
  }, [accountId, sessionId, id, mediaType]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!accountId || !sessionId) return;

      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/account_states?session_id=${sessionId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      setIsFav(data.favorite);
      setIsInWatchlist(data.watchlist);
    };

    fetchStatus();
  }, [accountId, sessionId, id, mediaType]);

  const onlyIfLogin = () => {
    redirectToTMDBLogin();
    return;
  };

  const toggleMediaStatus = async (
    action: "favorite" | "watchlist",
    currentValue: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean | null>>
  ) => {
    if (!accountId || !sessionId) {
      alert("You need to be logged in to perform this action.");
      onlyIfLogin();
      return;
    }

    const res = await updateUserMediaStatus(
      action,
      accountId,
      sessionId,
      Number(id),
      mediaType,
      !currentValue
    );

    if (res.success) setState(!currentValue);
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => toggleMediaStatus("watchlist", isInWatchlist ?? false, setIsInWatchlist)}
        className={`px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700 ${isInWatchlist ? "bg-blue-600 text-white" : "bg-gray-600 text-white"
          }`}
        title="Add to Watchlist"
      >
        <GoChecklist />
      </button>

      <button
        onClick={() => toggleMediaStatus("favorite", isFav ?? false, setIsFav)}
        className={`px-4 py-2 rounded-full cursor-pointer hover:bg-red-700 ${isFav ? "bg-red-600 text-white" : "bg-gray-600 text-white"
          }`}
        title="Add to Favorites"
      >
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

};


export default WatchButtons;
