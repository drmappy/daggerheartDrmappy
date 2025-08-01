import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function Weapon(){
    const [weapon, setWeapon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchWeapon();
        } catch (e) {
            setError('Failed to load weapon.');
        }
        setLoading(false);
    }, []);

    const fetchWeapon = async () => {
        const response = await fetch(`http://localhost:8080/creator/weapon/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem('Account')).username,
                'password': JSON.parse(localStorage.getItem('Account')).password
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch weapon');
        }
        const data = await response.json();
        setWeapon(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading weapon...</p>;
    if (!weapon) return null;

    return (
        <div>
            <h1>{weapon.name}</h1>
            <p>Description: {weapon.description}</p>
        </div>
    );
}
export default Weapon;