import React, { useState, useEffect } from "react";
function MySubclasses() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [subclasses, setSubclasses] = useState([]);

    const fetchSubclasses = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8080/creator/mySubClasses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch subclasses");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setSubclasses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubclasses();
    }, []);

    return (
        <div>
            <h1>My Subclasses</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {subclasses.map((subclass) => (
                    <li key={subclass.name}>{subclass.name} - {subclass.description}</li>
                ))}
            </ul>
        </div>
    );
}
export default MySubclasses;