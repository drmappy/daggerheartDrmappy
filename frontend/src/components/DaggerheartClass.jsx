import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

function DaggerheartClass() {
    const [daggerheartClass, setDaggerheartClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const fetchDaggerheartClass = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/creator/class/${name}`, {
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
            } catch (e) {
                setError('Failed to load daggerheartClass.');
            } finally {
                setLoading(false);
            }
        };
        fetchDaggerheartClass();
    }, [name]);

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading daggerheartClass...</p>;
    if (!daggerheartClass) return null;

    return (
        <div>
            <h1>{daggerheartClass.name}</h1>
            <p>Description: {daggerheartClass.description}</p>
            <h2>Domains</h2>
            <ul>
                {daggerheartClass.domains.map((domain, index) => (
                    <li key={index}>{domain}</li>
                ))}
            </ul>
            <h2>Starting evasion</h2>
            <p>{daggerheartClass.startingEvasion}</p>
            <h2>Starting HitPoints</h2>
            <p>{daggerheartClass.startingHitPoints}</p>
            <h2>Class Item</h2>
            <p>{daggerheartClass.classItem}</p>
            <h2>Hope Features</h2>
            <ul>
                {daggerheartClass.hopeFeatures.map((feature, index) => (
                    <li key={index}>{feature.name}</li>
                ))}
            </ul>
            <h2>Class Features</h2>
            <ul>
                {daggerheartClass.classFeatures.map((feature, index) => (
                    <li key={index}>{feature.name}</li>
                ))}
            </ul>
            <h2>SubClasses</h2>
            <ul>
                {daggerheartClass.subClasses.map((subClass, index) => (
                    <li key={index}>{subClass.name}</li>
                ))}
            </ul>
        </div>
    );
}
export default DaggerheartClass;