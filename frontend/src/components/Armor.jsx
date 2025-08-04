import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
function Armor() {
    const [armor, setArmor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchArmor();
        } catch (e) {
            setError('Failed to load armor.');
        }
        setLoading(false);
    }, []);

    const fetchArmor = async () => {
        const response = await fetch(`http://localhost:8080/creator/armor/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem('Account')).username,
                'password': JSON.parse(localStorage.getItem('Account')).password
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch armor');
        }
        const data = await response.json();
        setArmor(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading armor...</p>;
    if (!armor) return null;

    return (
        <div>
            <h1>{armor.name}</h1>
            Two tables centered bottom one containing threshold nums
            <p>Minor to major: {armor.minorToMajor}</p>
            <p>Major to sever: {armor.majorToSevere}</p>
            <p>Base armor score: {armor.baseArmorScore}</p>
        </div>
    );
}
export default Armor;