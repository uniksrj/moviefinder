import { getRequestToken } from "./tmdb";

export const redirectToTMDBLogin = async () => {
    const redirectUrl =
        import.meta.env.REACT_APP_TMDB_REDIRECT_URL ||
        (typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "");

    if (!redirectUrl) {
        console.error("Redirect URL is not available.");
        return;
    }

    const token = await getRequestToken();
    const requestToken = token.request_token;

    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
        redirectUrl
    )}`;
};
