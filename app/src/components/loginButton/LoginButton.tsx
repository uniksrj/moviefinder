import { getRequestToken } from "../../lib/tmdb";

export default function LoginButton() {
    const redirectUrl =
        import.meta.env.REACT_APP_TMDB_REDIRECT_URL || `${window.location.origin}/auth/callback`;
    const redirectToTMDBLogin = async () => {
        const token = await getRequestToken();
        const requestToken = token.request_token;
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
            redirectUrl
        )}`;
    };

    return (
        <button
            onClick={redirectToTMDBLogin}
            className="text-gray-600 hover:text-blue-600 font-medium  cursor-pointer transition duration-200"
        >
            Login with TMDB
        </button>
    );
}
