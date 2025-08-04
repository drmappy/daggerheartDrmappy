import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function Community(){
    const [community, setCommunity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchCommunity();
        } catch (e) {
            setError('Failed to load community.');
        }
        setLoading(false);
    }, []);

    const fetchCommunity = async () => {
        const response = await fetch(`http://localhost:8080/creator/community/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem('Account')).username,
                'password': JSON.parse(localStorage.getItem('Account')).password
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch community');
        }
        const data = await response.json();
        setCommunity(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading community...</p>;
    if (!community) return null;

    return (
        <div>
            <h1>{community.name}</h1>
            <p>Description: {community.description}</p>
            <h2>Feature</h2>
            <h3>{community.feature.name}</h3>
            <p>{community.feature.description}</p>
        </div>
    );
}
export default Community;