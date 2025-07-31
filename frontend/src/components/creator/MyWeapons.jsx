import React, { useState, useEffect } from "react";
function MyWeapons(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [weapons, setWeapons] = useState([]);

    const fetchWeapons = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8080/creator/myWeapons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch weapons");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setWeapons(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeapons();
    }, []);

    return (
        <div>
            <h1>My Weapons</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {weapons.map((weapon) => (
                    <li key={weapon.name}>{weapon.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default MyWeapons;