import React, { useState, useEffect } from "react";
function MyAncestries() {
    const [ancestries, setAncestries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchAncestries = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/myAncestries", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setAncestries(data);
        } catch (error) {
            console.error("Error fetching ancestries:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAncestries();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>My Ancestries</h1>
        <ul>
            {ancestries.map((ancestry) => (
            <li key={ancestry.id}>{ancestry.name}</li>
            ))}
        </ul>
        </div>
    );
}
export default MyAncestries;