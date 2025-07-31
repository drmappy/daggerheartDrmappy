import React, { useState, useEffect } from "react";

function MyClasses(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8080/creator/myClasses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch classes");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setClasses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div>
            <h1>My Classes</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {classes.map((cls) => (
                    <li key={cls.name}>{cls.name} - {cls.description}</li>
                ))}
            </ul>
        </div>
    );
}
export default MyClasses;