import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

function MyAncestries() {
    const [ancestries, setAncestries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchAncestries = async () => {
        try {
            setLoading(true);
            setError("");
            const account = JSON.parse(localStorage.getItem("Account"));
            const response = await fetch("http://localhost:8080/creator/myAncestriesNames", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setAncestries(data);
        } catch (error) {
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
            <li key={ancestry} onClick={()=>{navigate('/creator/ancestry/' + ancestry)}}>{ancestry}</li>
            ))}
        </ul>
        </div>
    );
}
export default MyAncestries;