import React, { use, useEffect } from "react";
import { getYearFromDate, getCurrentTimezone, getCountryCodeFromTimezone } from '../../helper/GetCountryCodeFromTimezone';
import { format } from 'date-fns';
import RatingSection from "./RatingSection";
import WatchButtons from "./WatchButtons";

interface HeroProps {
  title: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: { iso_3166_1: string; release_dates: { certification: string; release_date: string }[] }[];
  rating: number;
  genres: string[];
  runtime: number;
  overview: string;
  trailerUrl: string | null;
  crew: { name: string; job: string }[];
  countries: { timezones: string[]; cca2: string; name: string }[];
  id: number | string;
  mediaType: string;
}

const HeroSection: React.FC<HeroProps> = ({
  title, posterPath, backdropPath, releaseDate, rating, genres, runtime, overview, trailerUrl, crew, countries, id, mediaType
}) => {
  const [crewData, setCrewData] = React.useState<{ name: string; job: string }[]>([]);
  const [release_date, setReleaseDate] = React.useState<string>('');
  const [certification, setCertification] = React.useState<string | undefined>(undefined);
  const [year, setYear] = React.useState<string>('');
  const formatTime = (minutes: any) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = hours > 0 ? `${hours}h` : '';
    const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : '';

    if (formattedHours && formattedMinutes) {
      return `${formattedHours} ${formattedMinutes}`;
    } else if (formattedHours) {
      return formattedHours;
    } else if (formattedMinutes) {
      return formattedMinutes
    } else {
      return '0m';
    }
  };


  function getKeyCrew(crew: any[]): { name: string; job: string }[] {
    const keyJobs = ['Director', 'Producer', 'Screenplay', 'Story', 'Editor', 'Production Design'];

    const seen = new Set();
    const result: { name: string; job: string }[] = [];

    for (const person of crew) {
      const key = `${person.name}-${person.job}`;
      if (keyJobs.includes(person.job) && !seen.has(key)) {
        result.push({ name: person.name, job: person.job });
        seen.add(key);
      }
    }

    return result;
  }

  useEffect(() => {
    const keyCrew = getKeyCrew(crew);
    setCrewData(keyCrew);
  }, [crew]);

  useEffect(() => {
    const userTimezone = getCurrentTimezone();
    const countryCode = getCountryCodeFromTimezone(userTimezone, countries);
    if (countryCode) {
      const releaseInfo = getCertificationAndReleaseDate(countryCode);
      if (releaseInfo) {
        setReleaseDate(format(new Date(releaseInfo.release_date), 'MMMM dd, yyyy'));
        setCertification(releaseInfo.certification);
        setYear(getYearFromDate(releaseInfo.release_date));
      }
    }

  }, [releaseDate]);

  function getCertificationAndReleaseDate(countryCode: string) {
    const actualReleaseDataArray = Array.isArray(releaseDate)
      ? releaseDate
      : Object.values(releaseDate || {});

    const countryData = (actualReleaseDataArray as any[]).find(
      (item: any) => item?.iso_3166_1 === countryCode
    );

    if (!countryData || !Array.isArray(countryData.release_dates)) {
      return null;
    }
    const releaseInfo = countryData.release_dates[0];
    return {
      certification: releaseInfo?.certification,
      release_date: releaseInfo?.release_date
    };
  }

  return (
    <div className="w-full text-white">
      <div className="relative z-10 flex flex-col lg:flex-row p-6 gap-10 max-w-screen-2xl mx-auto">
        <img src={posterPath} className="w-100 rounded-xl shadow-2xl" alt={title} />

        <div className="flex flex-col space-y-4 w-full">
          <h1 className="text-4xl font-bold">
            {title} {year && `(${year})`}
          </h1>          
          <p className="text-md">
            {certification && (
              <>
                <span className="border-white border-1 px-1 py-0.5 text-sm shadow-lg mx-1 text-gray-300 font-semibold">
                  {certification}
                </span>
              </>
            )}
            {release_date && (
              <>
                <span>{release_date}</span>
                <span className="mx-2 text-gray-400">•</span>
              </>
            )}  
            {genres?.length > 0 && (
              <>
                <span>{genres.join(', ')}</span>
                <span className="mx-2 text-gray-400">•</span>
              </>
            )}
            {runtime && <span>{formatTime(runtime)}</span>}
          </p>
          <RatingSection rating={rating} />
          <WatchButtons trailerUrl={trailerUrl} id={id ?? ""} mediaType={mediaType} />
          <h3 className="text-xl my-0 font-bold">Overview</h3>
          <hr className="my-2" />
          <p>{overview}</p>
          {crewData.length > 0 && (
            <div className="mt-4 text-sm text-gray-300">
              <h3 className="font-semibold text-white mb-2 text-xl my-0 font-bold">Crew</h3>
              <hr className="my-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {crewData.map((person, idx) => (
                  <div key={idx} className="truncate">
                    <span className="text-white font-medium">{person.name}</span>
                    <span className="mx-1 text-gray-400">—</span>
                    <span className="italic text-gray-300">{person.job}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default HeroSection;
