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

  interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    [key: string]: any;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const loaderRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchQuery);
  const [searchMode, setSearchMode] = useState(false);

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
      console.log(`Fetching movies with params: ${queryParams.toString()}`);

      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}?${queryParams.toString()}`,
        options
      );
      const $type = type.split("/")[1];
      const resultsWithMediaType = (["movie", "tv"].includes($type))
        ? res.data.results.map((item: Movie) => ({ ...item, media_type: $type }))
        : res.data.results;
      console.log(res);
      setMovies((prev) => {
        const combined = [...prev, ...resultsWithMediaType];
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
    console.log("Movies fetched:", movies);

  }

  const fetchSearchResults = async (query: string) => {
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi`,
        {
          params: {
            query,
          },
          ...options,
        }
      );

    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    if (searchMode) return;
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
    if (searchMode) return;
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

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {

    if (!debouncedTerm) {
      setSearchMode(false);
      return;
    }
    setSearchMode(true);
    const fetchSearchResults = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
          params: { query: debouncedTerm },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`,
          },
        });
        if (res.data.results.length == 0) {
          setMovies([]);
          return;
        } else {
          const filtered: SearchResult[] = res.data.results.filter((item: SearchResult) =>
            (item.title || item.name || "").toLowerCase().includes(debouncedTerm.toLowerCase())
          );
          // Map filtered results to Movie type, filtering out items missing required fields
          const mapped: Movie[] = filtered
            .filter((item) =>
              (item.title || item.name) &&
              item.overview &&
              item.poster_path &&
              item.release_date &&
              typeof item.vote_average === "number"
            )
            .map((item) => ({
              id: item.id,
              title: item.title || item.name || "",
              overview: item.overview,
              poster_path: item.poster_path,
              release_date: item.release_date,
              vote_average: item.vote_average,
            }));
          setMovies(mapped);
        }
        // Filter out results that are not movies or TV shows

      } catch (err) {
        console.error("Search error:", err);
      }
    };
    fetchSearchResults();
  }, [debouncedTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = searchQuery.trim();

    if (value === "") {
      console.log("Search query is empty, resetting search mode.");
      setSearchMode(false);
      setPage(1);
      setMovies([]);
    } else {
      console.log(`Searching for: ${value}`);
      setSearchMode(true);
      fetchSearchResults(value);
    }
  }

  console.log("Movies:", movies);

  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="flex">
          <Sidebar setDatavalue={setFilter} details={filter} pageReset={setPage} />

          {/* Main content */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-center mb-4">
              <form onSubmit={handleSearch} className="w-full flex justify-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter to Search"
                  className="w-full sm:w-2/3 md:w-1/3 px-4 py-2 border-0 rounded-sm border-b border-b-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30 transition duration-300"
                />
              </form>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.length === 0 && searchQuery && (
                <li className="col-span-full bg-red-50 border-l-4 border-red-500 p-4">
                  <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mb-4 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM12 17.25c-3 0-4.5-1.5-4.5-4.5m9 0c0 3-1.5 4.5-4.5 4.5m0-13.5a9 9 0 100 18 9 9 0 000-18z" />
                    </svg>
                    <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                    <p className="max-w-md text-sm">
                      Try adjusting your search terms or filters. We couldn’t find any movies matching your criteria.
                    </p>
                  </div>
                </li>

              )}
              {error && (
                <li className="col-span-full bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700 font-medium">Error: {error.message}</p>
                </li>
              )}
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Card data={{ ...movie, id: movie.id.toString() }} />
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


