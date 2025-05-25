import { Link } from "react-router";

interface CardData {
  poster_path: string;
  title: string;
  name?: string; // Optional property
  release_date: string;
  first_air_date?: string; // Optional property
  vote_average: number;
  id: string; // Added property
  media_type: string; // Added property
}

export const Card = ({ data }: { data: CardData; }) => {
  let newDate = data.release_date ??  data.first_air_date;
  const date = new Date(newDate);  
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100">
    <div className="flex flex-col sm:flex-row h-full">
      {/* Poster Image */}
      <img
        className="w-full sm:w-32 h-48 sm:h-48 object-cover"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      />

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Movie Title */}
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
          {data.title ??  data.name}
        </h3>

        {/* Release Date */}
        <p className="text-gray-600 text-sm mt-1">{date.toLocaleDateString("en-US",options)}</p>

        {/* Rating Badge */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            Rating: {data.vote_average.toFixed(1)}
          </span>
        </div>

        {/* View Button (Push to Bottom) */}
        <div className="mt-auto">
          <button className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium cursor-pointer">
          <Link to={`/details/${data.media_type}/${data.id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};
