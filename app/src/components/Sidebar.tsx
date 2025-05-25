import { use, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { data } from "../data"; // Adjust the path to the correct location of the data module
interface SidebarProps {
    setDatavalue: React.Dispatch<React.SetStateAction<{
      type: string;
      sortBy: string;
      release_date: string;
      vote_average: string;
      genere: string;
    }>>;
    details: {
      type: string;
      sortBy: string;
      release_date: string;
      vote_average: string;
      genere: string;
    };
    pageReset: React.Dispatch<React.SetStateAction<number>>;
  }
export const Sidebar = ({setDatavalue, details, pageReset}:SidebarProps) => {
    const [selectedType, setSelectedType] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");

    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [pending, setPending] = useState({
        type: "",
        sortBy: "",
        release_date: "",
        vote_average: "",
        genere : "",
      });

    const genres = data.genre;

    const handleGenreClick = (genre: string | number) => {
        const genreStr = genre.toString();

    const isSameGenre = selectedGenre === genreStr;

    const updatedGenre = isSameGenre ? null : genreStr;
    const updatedValue = isSameGenre ? "" : genreStr;

    setSelectedGenre(updatedGenre);
    setPending({
        ...details,
        genere: updatedValue
    });
    };
    return (
        <div className="flex flex-col border-r border-gray-700 pr-4 w-64 h-auto bg-gray-800 text-white overflow-y-auto">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <h1 className="text-xl font-bold">Movie Finder</h1>
            </div>

            <nav className="flex-grow p-4 space-y-6">

                {/* Filters */}
                <div className="space-y-4">
                    {/* Type Filter */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Movie Type</label>
                        <select
                            className="w-full p-2 bg-gray-700 rounded text-white"
                            value={pending.type}
                            onChange={(e) => setPending({
                                ...details,
                                type: e.target.value.toLowerCase()
                            })}
                        >
                            <option value="">All</option>
                            <option value="movie">Movie</option>
                            <option value="tv">TV Show</option>
                        </select>
                    </div>

                    {/* Sort Option */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Sort By</label>
                        <select
                            className="w-full p-2 bg-gray-700 rounded text-white"
                            value={pending.sortBy}
                            onChange={(e) => setPending({
                                ...details,
                                sortBy: e.target.value
                            })}
                        >
                            <option value="">Default</option>
                            <option value="az">A - Z</option>
                            <option value="za">Z - A</option>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    {/* Release Year */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Release Year</label>
                        <input
                            type="number"
                            className="w-full p-2 bg-gray-700 rounded text-white"
                            placeholder="e.g. 2023"
                            value={pending.release_date}
                            onChange={(e) => setPending({
                                ...details,
                                release_date: e.target.value
                            })}
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Minimum Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            className="w-full p-2 bg-gray-700 rounded text-white"
                            placeholder="e.g. 7.5"
                            value={pending.vote_average}
                            onChange={(e) => setPending({
                                ...details,
                                vote_average: e.target.value
                            })}
                        />
                    </div>
                    <h2 className="text-lg font-semibold mb-3">Genres</h2>
                    <div className="flex flex-wrap gap-2"> 
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => handleGenreClick(genre.id)}
                                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium transition-colors ${selectedGenre === genre.id.toString()
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                    {/* Apply Filters */}
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-medium cursor-pointer"
                        onClick={() => {                            
                            setDatavalue(pending);
                            pageReset(1);
                        }}
                    >
                        Apply Filters
                    </button>
                    <div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
