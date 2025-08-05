import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
function Search(){
    const [searchName, setSearchName] = useState("");
    const [objects, setObjects] = useState([]);
    const [objectOptions, setObjectOptions] = useState([
        "ANCESTRY",
        "COMMUNITY",
        "FEATURE",
        "ARMOR",
        "CLASS",
        "SUBCLASS",
        "WEAPON"
    ]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const limitPageChoice = 5;
    const pageBandwidth = Math.min(totalPages, limitPageChoice);

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:8080/player/search/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "name": searchName,
                        "page": page,
                        "objectType": objects.join(",")
                    },
                }
            )
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();
            setSearchResults(data.results);
            setTotalPages(data.pages);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };
    const handleObjectChange = (e) => {
        const value = e.target.value;
        if (objects.includes(value)) {
            setObjects(objects.filter((obj) => obj !== value));
        } else {
            setObjects([...objects, value]);
        }
    };
    return (
        <div>
            <h1>Search</h1>
            <p>This component will allow users to search for various objects.</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search..."
                />
                <div>
                    {objectOptions.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={objects.includes(option)}
                                onChange={handleObjectChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>
            {searchResults.length > 0 && (
                <div>
                    <h2>Results</h2>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index} onClick={() => navigate(`/player/${result.objectType.toLowerCase()}/${result.name}`)}>
                                {result.name} ({result.objectType})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                {totalPages > 0 && (() => {
                    let start = 0;
                    if (pageBandwidth % 2 !== 0) {
                        start = Math.max(0, page - Math.floor(pageBandwidth / 2));
                        if (start + pageBandwidth > totalPages) {
                            start = Math.max(0, totalPages - pageBandwidth);
                        }
                    }
                    const pages = Array.from({ length: pageBandwidth }, (_, i) =>
                        (pageBandwidth % 2 !== 0 ? start + i : i)
                    );
                    return pages.map(i => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            disabled={i === page}
                        >
                            {i + 1}
                        </button>
                    ));
                })()}
            </div>
        </div>
    );
}
export default Search;