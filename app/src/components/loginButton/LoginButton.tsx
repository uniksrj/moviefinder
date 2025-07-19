import { redirectToTMDBLogin } from "~/src/lib/Tmdblogin";
export default function LoginButton() {  

    return (
        <button
            onClick={redirectToTMDBLogin}
            className="text-gray-600 hover:text-blue-600 font-medium  cursor-pointer transition duration-200"
        >
            Login with TMDB
        </button>
    );
}
