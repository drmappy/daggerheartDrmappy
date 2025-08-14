import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function Subclass() {
    const [subclass, setSubclass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchSubclass();
        } catch (e) {
            setError('Failed to load subclass.');
        }
        setLoading(false);
    }, []);

    const fetchSubclass = async () => {
        const response = await fetch(`http://localhost:8080/creator/subclass/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch subclass');
        }
        const data = await response.json();
        setSubclass(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading subclass...</p>;
    if (!subclass) return null;

    return (
        <div>
            <h1>{subclass.name}</h1>
            <p>Description: {subclass.description}</p>
            <p>Spell casting trait: {subclass.spellcastingTrait}</p>
            <h2>Foundation Features</h2>
            <ul>
                {subclass.foundationFeatures.map((feature, index) => (
                    <li key={index}>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                    </li>
                ))}
            </ul>
            <h2>Specialization Features</h2>
            <ul>
                {subclass.specializationFeatures.map((feature, index) => (
                    <li key={index}>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                    </li>
                ))}
            </ul>
            <h2>Mastery Features</h2>
            <ul>
                {subclass.masteryFeatures.map((feature, index) => (
                    <li key={index}>
                        <h3>{feature.name}</h3>
                        <p>{feature.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Subclass;