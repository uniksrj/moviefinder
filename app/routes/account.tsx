import { useEffect, useState } from "react";
import { getAccount } from "../src/lib/tmdb";

export default function Account() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session_id = localStorage.getItem("tmdb_session_id");
    if (!session_id) return;

    getAccount(session_id).then(setUser);
  }, []);

  if (!user) return <div className="p-4 text-center">Loading account info...</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h2 className="text-2xl font-bold">Hello, {user.username}</h2>
      <p className="text-gray-600">User ID: {user.id}</p>
    </div>
  );
}
