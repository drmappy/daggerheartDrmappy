import React, { useState, useEffect } from "react";

function MyArmors() {
    const [armors, setArmors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArmors() {
        try {
            const response = await fetch("http://localhost:8080/creator/myArmors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": JSON.parse(localStorage.getItem("Account")).username,
                    "password": JSON.parse(localStorage.getItem("Account")).password
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setArmors(data);
        } catch (error) {
            console.error("Failed to fetch armors:", error);
        } finally {
            setLoading(false);
        }
        }
        fetchArmors();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>My Armors</h1>
        <ul>
            {armors.map((armor) => (
            <li key={armor.name}>{armor.name}</li>
            ))}
        </ul>
        </div>
    );
}
export default MyArmors;