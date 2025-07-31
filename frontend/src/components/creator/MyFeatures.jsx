import React, { useState, useEffect } from "react";

function MyFeatures() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [features, setFeatures] = useState([]);

    const fetchFeatures = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8080/creator/myFeatures", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch features");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setFeatures(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    return (
        <div>
            <h1>My Features</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {features.map((feature) => (
                    <li key={feature.name}>{feature.name} - {feature.description}</li>
                ))}
            </ul>
        </div>
    );
}
export default MyFeatures;