import React, { useState, useEffect } from "react";

function MyCommunities() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [communities, setCommunities] = useState([]);

    const fetchCommunities = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8080/creator/myCommunities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch communities");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setCommunities(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    return (
        <div>
            <h1>My Communities</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {communities.map((community) => (
                    <li key={community.name}>{community.name} - {community.description}</li>
                ))}
            </ul>
        </div>
    );
}
export default MyCommunities;