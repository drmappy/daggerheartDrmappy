import React, { useState, useEffect } from 'react';
import {useParams} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
function Armor() {
    const [armor, setArmor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();
    const [canModify, setCanModify] = useState(false);

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
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch armor');
        }
        const data = await response.json();
        setArmor(data);
        const bool = await verifyAccount();
        setCanModify(bool);
        setLoading(false);
    };
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/armor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(armor)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/armor/${armor.name}`);
            })
            .catch(() => {
                setError('Failed to modify armor.');
            });
    };
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading armor...</p>;
    if (!armor) return null;

    return (
        <div>
            {canModify && (
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    modifyInfo();
                }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={armor.name}
                        onChange={(e) => setArmor({ ...armor, name: e.target.value })}
                        placeholder={armor.name}
                    />
                    <label>Minor to Major</label>
                    <input
                        type="text"
                        value={armor.minorToMajor}
                        onChange={(e) => setArmor({ ...armor, minorToMajor: e.target.value })}
                        placeholder={armor.minorToMajor}
                    />
                    <label>Major to Severe</label>
                    <input
                        type="text"
                        value={armor.majorToSevere}
                        onChange={(e) => setArmor({ ...armor, majorToSevere: e.target.value })}
                        placeholder={armor.majorToSevere}
                    />
                    <label>Base Armor Score</label>
                    <input
                        type="text"
                        value={armor.baseArmorScore}
                        onChange={(e) => setArmor({ ...armor, baseArmorScore: e.target.value })}
                        placeholder={armor.baseArmorScore}
                    />
                    <button type="submit"
                            disabled={loading}
                    >Modify</button>
                </form>
            )}
            <div>
                <h1>{armor.name}</h1>
                <p>Minor to major: {armor.minorToMajor}</p>
                <p>Major to sever: {armor.majorToSevere}</p>
                <p>Base armor score: {armor.baseArmorScore}</p>
                {armor.feature !== null && (
                    <div>
                        <h2>Feature</h2>
                        <p>Name: {armor.feature.name}</p>
                        <p>Description: {armor.feature.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Armor;