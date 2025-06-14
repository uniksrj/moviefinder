import { getRequestToken } from "../../lib/tmdb";

export default function LoginButton() {
  const handleLogin = async () => {
    const data = await getRequestToken();
    const request_token = data.request_token;
    if (!request_token) return;

    const redirect = `${window.location.origin}/auth/callback?request_token=${request_token}`;
    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${encodeURIComponent(redirect)}`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
    >
      Login with TMDb
    </button>
  );
}
