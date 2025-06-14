import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Card } from "~/src/components/Card";
import { Sidebar } from "~/src/components/Sidebar";
import { ClipLoader } from "react-spinners";

export function Welcome() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${String(import.meta.env.VITE_TMDB_AUTH_TOKEN)}`
    }
  };

  interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }
  interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }


  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const loaderRef = useRef(null);

  const [filter, setFilter] = useState<{
    type: string;
    sortBy: string;
    release_date: string;
    vote_average: string;
    genere: string;
  }>({
    type: "",
    sortBy: "",
    release_date: "",
    vote_average: "",
    genere: "",
  });

  async function fetchMovies(type: string) {
    const rawSort = filter.sortBy;
    let mappedSort = "";

    if (rawSort) {
      if (filter.type === "movie") {
        mappedSort = {
          az: "original_title.asc",
          za: "original_title.desc",
          latest: "primary_release_date.desc",
          oldest: "primary_release_date.asc"
        }[rawSort] || "";
      } else if (filter.type === "tv") {
        mappedSort = {
          az: "name.asc",
          za: "name.desc",
          latest: "first_air_date.desc",
          oldest: "first_air_date.asc"
        }[rawSort] || "";
      }
    }

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        language: "en-US",
        page: page.toString(),
        ...(mappedSort && { sort_by: mappedSort }),
        ...(filter.vote_average && { "vote_average.gte": filter.vote_average }),
        ...(filter.genere && { with_genres: filter.genere }),
        ...(filter.release_date &&
          (filter.type === "movie"
            ? { primary_release_year: filter.release_date }
            : { first_air_date_year: filter.release_date })),
      });

      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}?${queryParams.toString()}`,
        options
      );
      // console.log(res);
      setMovies((prev) => {
        const combined = [...prev, ...res.data.results];
        const unique = Array.from(new Map(combined.map(m => [m.id, m])).values());
        return unique;
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (filter.type === undefined || filter.type === null) return;
    setMovies([]);
    setPage(1);

    let endpoint = "";
    // Determine the endpoint based on the filter type
    if (filter.type === "tv") {
      endpoint = "discover/tv";
    } else if (filter.type === "movie") {
      endpoint = "discover/movie";
    } else {
      endpoint = "trending/all/day";
    }
    fetchMovies(endpoint);
  }, [filter]);

  useEffect(() => {
    if (page === 1) return;
    if (filter.type === undefined || filter.type === null) return;
    let endpoint = "";
    if (filter.type === "tv") {
      endpoint = "discover/tv";
    } else if (filter.type === "movie") {
      endpoint = "discover/movie";
    } else {
      endpoint = "trending/all/day";
    }
    fetchMovies(endpoint);
  }, [page]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);


  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="flex">
          <Sidebar setDatavalue={setFilter} details={filter} pageReset={setPage} />

          {/* Main content */}
          <div className="flex-1 p-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {loading && (
                <li className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-300">Loading...</p>
                </li>
              )} */}
              {error && (
                <li className="col-span-full bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 font-medium">Error: {error.message}</p>
                </li>
              )}
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Card data={{ ...movie, id: movie.id.toString(), media_type: filter.type || "movie" }} />
                </li>
              ))}
            </ul>
            <div ref={loaderRef} className="h-10 col-span-full flex justify-center items-center">
              {loading && (
                <div className="flex items-center space-x-2">
                  <ClipLoader size={20} color="#D1D5DB" />
                  <span className="text-gray-300">Loading more...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}


