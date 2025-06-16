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
const getRatingColor = (rating: string | number) => {
  const numericRating = typeof rating === "number" ? rating : parseFloat(rating);
  if (numericRating >= 7.5) return 'bg-green-100 text-green-700';
  if (numericRating >= 5.0) return 'bg-orange-100 text-orange-700';
  return 'bg-red-100 text-red-700';
};
  return (
  <Link 
  to={`/details/${data.media_type}/${data.id}`} 
  className="group relative w-64 rounded-xl transition-transform duration-300 hover:scale-105"
>
  <div className="h-full flex flex-col rounded-xl overflow-hidden backdrop-blur-sm bg-white transition-all duration-300 border border-gray-100 hover:backdrop-blur-lg hover:shadow-[0_0_20px_rgb(255,0,255),0_0_10px_rgb(0,255,255),0_0_15px_rgb(0,255,0)]">
    
    {/* Poster Image */}
    <img
      className="w-full h-84 object-cover"
      src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
      alt={data.title}
    />

    {/* Content */}
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
        {data.title ?? data.name}
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        {date.toLocaleDateString("en-US", options)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className={`px-2 py-1 text-xs rounded-full ${getRatingColor(data.vote_average)}`}>
          Rating: {typeof data.vote_average  === "number" ? data.vote_average.toFixed(1): "N/A"}
        </span>
      </div>
    </div>

  </div>
</Link>

  );
};
