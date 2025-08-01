import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function DaggerheartClass(){
    const [daggerheartClass, setDaggerheartClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchDaggerheartClass();
        } catch (e) {
            setError('Failed to load daggerheartClass.');
        }
        setLoading(false);
    }, []);

    const fetchDaggerheartClass = async () => {
        const response = await fetch(`http://localhost:8080/creator/daggerheartClass/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem('Account')).username,
                'password': JSON.parse(localStorage.getItem('Account')).password
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch daggerheartClass');
        }
        const data = await response.json();
        setDaggerheartClass(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading daggerheartClass...</p>;
    if (!daggerheartClass) return null;

    return (
        <div>
            <h1>{daggerheartClass.name}</h1>
            <p>Description: {daggerheartClass.description}</p>
        </div>
    );
}
export default DaggerheartClass;