import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function Ancestry() {
    const [ancestry, setAncestry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchAncestry();
        } catch (e) {
            setError('Failed to load ancestry.');
        }
        setLoading(false);
    }, []);

    const fetchAncestry = async () => {
        const response = await fetch(`http://localhost:8080/creator/ancestry/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem('Account')).username,
                'password': JSON.parse(localStorage.getItem('Account')).password
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch ancestry');
        }
        const data = await response.json();
        setAncestry(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading ancestry...</p>;
    if (!ancestry) return null;

    return (
        <div>
            <h1>{ancestry.name}</h1>
            <p>Description: {ancestry.description}</p>
        </div>
    );
}
export default Ancestry;