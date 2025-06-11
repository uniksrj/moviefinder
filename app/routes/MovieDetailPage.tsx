import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "~/src/components/movieDetails/HeroSection";
import WatchButtons from "~/src/components/movieDetails/WatchButtons";
import CastSlider from "~/src/components/movieDetails/CastSlider";
import MovieInfoSidebar from "~/src/components/movieDetails/MovieInfoSidebar";


const imageBase = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [countries, setCountries] = useState([]);
  if (!import.meta.env.VITE_TMDB_AUTH_TOKEN) {
    console.error("TMDB token is missing!");
    return;
  }
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_AUTH_TOKEN}`
    },
    params: {
      append_to_response: 'release_dates,videos,content_ratings'
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const [detailRes, creditRes, countryList] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/${type}/${id}`, options),
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, options),
        axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,timezones`)
      ]);
      const filteredCountries = countryList.data.map((country: { name?: { common?: string }; cca2?: string; timezones?: string[] }) => ({
        name: country.name?.common || 'Unknown',
        code: country.cca2 || 'N/A',
        timezones: country.timezones || []
      }));
      setCountries(filteredCountries);
      setDetails(detailRes.data);
      setCredits(creditRes.data);
    };
    fetchData();
  }, [type, id]);

  if (!details || !credits) return <div className="text-white p-4">Loading...</div>;

  const trailer = details.videos?.results.find((v: { type: string; site: string; key: string }) => v.type === "Trailer" && v.site === "YouTube");
  const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

  return (
    <div className="bg-black text-white min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-20"
          style={{ backgroundImage: `url(${imageBase}${details.backdrop_path || details.poster_path})` }}
        ></div>

        <div className="relative z-10">
          <HeroSection
            title={details.title || details.name}
            posterPath={`${imageBase}${details.poster_path}`}
            backdropPath={details.backdrop_path}
            releaseDate={details.release_dates || details.first_air_date}
            rating={details.vote_average}
            genres={details.genres.map((g: any) => g.name)}
            runtime={details.runtime || details.episode_run_time?.[0] || 0}
            overview={details.overview}
            trailerUrl={trailerUrl}
            crew={credits.crew}
            countries={countries}
          />
          {/* <WatchButtons trailerUrl={trailerUrl} />  */}

          <div className="flex flex-col items-center lg:flex-row gap-8 p-6">
            <div className="lg:w-3/4">
              <CastSlider cast={credits.cast} />
            </div>
            <MovieInfoSidebar
              status={details.status}
              language={details.original_language}
              budget={details.budget || 0}
              revenue={details.revenue || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
