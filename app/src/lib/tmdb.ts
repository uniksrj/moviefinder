const API_KEY = import.meta.env.VITE_TMDB_AUTH_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer  ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`
  }
};
export const getRequestToken = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new`,options
  );
  return res.json();
};

export const createSession = async (request_token: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new`,
    {
      ...options,
      method: 'POST',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request_token }),
    }
  );
  return res.json();
};

export const getAccount = async (session_id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/account?session_id=${session_id}`,options
  );
  return res.json();
};
