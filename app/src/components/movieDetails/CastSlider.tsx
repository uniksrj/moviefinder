import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Or any icon lib you prefer

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

const CastSlider: React.FC<{ cast: CastMember[] }> = ({ cast }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7; // Scroll 70% width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Cast</h2>

      <div className="relative">
        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scroll-smooth scrollbar-hide"
        >
          {cast.slice(0, 10).map((actor) => (
            <div
              key={actor.id}
              className="w-28 shrink-0 flex-none text-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                className="rounded-lg w-24 h-32 object-cover mx-auto mb-1"
                alt={actor.name}
              />
              <p className="text-sm font-medium truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">{actor.character}</p>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/3 -translate-y-1/3 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/3 -translate-y-1/3 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CastSlider;
