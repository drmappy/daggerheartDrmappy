import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
function Search(){
    const [searchName, setSearchName] = useState("");
    const [objects, setObjects] = useState([]);
    const objectOptions = [
        "ANCESTRY",
        "COMMUNITY",
        "FEATURE",
        "ARMOR",
        "CLASS",
        "SUBCLASS",
        "WEAPON",
        "ENEMY"
    ];
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const limitPageChoice = 5;

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSearch = async (newPage) => {
        if(objects.length === 0) {
            setError("Please select at least one object type to search.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:8080/player/search?name=${searchName}&page=${newPage ?? page}&objects=${objects.join(",")}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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
            <form onSubmit={(e)=> {
                e.preventDefault();
                handleSearch();
                setPage(0);
            }}>
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
                            <li key={index} onClick={() => navigate(`/player/${result.type.toLowerCase()}/${result.name}`)}>
                                {result.name} ({result.type})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                {totalPages > 0 && (() => {
                    let start = Math.max(0, page - Math.floor(limitPageChoice / 2));
                    let end = Math.min(totalPages, start + limitPageChoice);
                    if (end - start < limitPageChoice) {
                        start = Math.max(0, end - limitPageChoice);
                    }
                    const pages = Array.from({ length: end - start }, (_, i) => start + i);
                    return pages.map(i => (
                        <button
                            key={i}
                            onClick={async () => {
                                setPage(i)
                                setSearchResults([]);
                                await handleSearch(i);
                            }}
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