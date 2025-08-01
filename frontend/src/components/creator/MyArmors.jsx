import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function MyArmors() {
    const [armors, setArmors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArmors() {
        try {
            const response = await fetch("http://localhost:8080/creator/myArmorsNames", {
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
            <li key={armor} onClick={()=>(navigate('/creator/armor/' + armor))}>{armor}</li>
            ))}
        </ul>
        </div>
    );
}
export default MyArmors;