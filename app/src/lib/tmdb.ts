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
  if (!request_token) {
    throw new Error("No request token provided");
  }
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
 const data = await res.json();

  if (!res.ok || data.success === false) {
    console.error("❌ Failed to create session", data);
    throw new Error(data.status_message || "Session creation failed");
  }

  return data; 
};

export const getAccount = async (session_id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/account?session_id=${session_id}`,options
  );
  return res.json();
};
