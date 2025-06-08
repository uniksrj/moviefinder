import { use, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { data } from "../data"; // Adjust the path to the correct location of the data module
interface SidebarProps {
    setDatavalue: React.Dispatch<React.SetStateAction<{
        type: string;
        sortBy: string;
        release_date: string;
        vote_average: string;
        genere: string | number[];
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
export const Sidebar = ({ setDatavalue, details, pageReset }: SidebarProps) => {
    // const [selectedType, setSelectedType] = useState("");
    // const [sortOption, setSortOption] = useState("");
    // const [year, setYear] = useState("");
    // const [rating, setRating] = useState("");

    const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
    const [pending, setPending] = useState({
        type: "",
        sortBy: "",
        release_date: "",
        vote_average: "",
        genere: "",
    });

    const genres = data.genre;

    // const handleGenreClick = (genre: string | number) => {
    //     const genreStr = genre.toString();

    // const isSameGenre = selectedGenre === genreStr;

    // const updatedGenre = isSameGenre ? null : genreStr;
    // const updatedValue = isSameGenre ? "" : genreStr;

    // setSelectedGenre(updatedGenre);
    // setPending({
    //     ...details,
    //     genere: updatedValue
    // });
    // };

    const handleGenreClick = (genreId: number) => {
        const updatedGenres = selectedGenre.includes(genreId)
            ? selectedGenre.filter((id) => id !== genreId)
            : [...selectedGenre, genreId];

        setSelectedGenre(updatedGenres);

        setPending((prev) => ({
            ...prev,
            genere: updatedGenres.join(','),
        }));
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
                                ...pending,
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
                            disabled={pending.type == ""}
                            className={`w-full p-2 bg-gray-700 rounded text-white
                                ${pending.type == "" ? "bg-gray-500 border-2 border-red-500" : "bg-gray-700"
                                }`}
                            value={pending.sortBy}
                            onChange={(e) => setPending({
                                ...pending,
                                sortBy: e.target.value
                            })}
                        >
                            <option value="">Default</option>
                            <option value="az">A - Z</option>
                            <option value="za">Z - A</option>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        {pending.type == "" && (
                            <p className="text-red-500 text-xs mt-1">Please select a movie type first</p>
                        )}
                    </div>

                    {/* Release Year */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Release Year</label>
                        <input
                            disabled={pending.type == ""}
                            type="number"
                            className={`w-full p-2 bg-gray-700 rounded text-white
                                ${pending.type == "" ? "bg-gray-500 border-2 border-red-500" : "bg-gray-700"
                                }`}
                            placeholder="e.g. 2023"
                            value={pending.release_date}
                            onChange={(e) => setPending({
                                ...pending,
                                release_date: e.target.value
                            })}
                        />
                         {pending.type == "" && (
                            <p className="text-red-500 text-xs mt-1">Please select a movie type first</p>
                        )}
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold">Minimum Rating</label>
                        <input
                            disabled={pending.type == ""}
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            className={`w-full p-2 bg-gray-700 rounded text-white
                                 ${pending.type == "" ? "bg-gray-500 border-2 border-red-500" : "bg-gray-700"
                                }`}
                            placeholder="e.g. 7.5"
                            value={pending.vote_average}
                            onChange={(e) => setPending({
                                ...pending,
                                vote_average: e.target.value
                            })}
                        />
                        {pending.type == "" && (
                            <p className="text-red-500 text-xs mt-1">Please select a movie type first</p>
                        )}
                    </div>
                    <h2 className="text-lg font-semibold mb-3">Genres</h2>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <button
                                disabled={pending.type == ""}
                                key={genre.id}
                                onClick={() => handleGenreClick(genre.id)}
                                className={`px-3 cursor-pointer py-1 rounded-full text-sm font-medium transition-colors ${selectedGenre.includes(genre.id)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                    }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                        {pending.type == "" && (
                            <p className="text-red-500 text-xs mt-1">Please select a movie type first</p>
                        )}
                    </div>
                    {/* Apply Filters */}
                    <button
                        disabled={pending.type == ""}
                        className={`w-full bg-blue-600  transition-colors p-2 rounded font-medium 
                                    ${pending.type == "" ? "bg-gray-500 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"}`}
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
