import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { createSession, getAccount } from "../../src/lib/tmdb";

export default function AuthCallback() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            const token = params.get("request_token");

            if (!token) {
                alert("No token found");
                return navigate("/");
            }

            try {
                const sessionRes = await createSession(token);
                if (sessionRes.success && sessionRes.session_id) {
                    localStorage.setItem("tmdb_session", sessionRes.session_id);
                    console.log("✅ Session ID saved:", sessionRes.session_id);
                } else {
                    console.error("❌ Failed to create session:", sessionRes);
                }
                const user = await getAccount(sessionRes.session_id);
                localStorage.setItem("tmdb_user", JSON.stringify(user));

                navigate("/");
            } catch (error) {
                console.error("TMDB Auth Error", error);
                navigate("/");
            }
        };
        handleAuth();
    }, [params, navigate]);

    return <div className="p-4 text-center">Logging in...</div>;
}
