export const isFavorite = async (
  accountId: number,
  sessionId: string,
  mediaType: 'movie' | 'tv',
  mediaId: number
) => {
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/${mediaType == 'movie' ? 'movies' : 'tv'}?session_id=${sessionId}`;

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.status_message || 'Failed to fetch favorites');
  }

  return data.results.some((item: any) => item.id === mediaId);
};
