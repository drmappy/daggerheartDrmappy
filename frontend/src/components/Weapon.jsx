import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
function Weapon(){
    const navigate = useNavigate();
    const [canModify, setCanModify] = useState(false);
    const [weapon, setWeapon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            fetchWeapon().then(
                () => {
                    verifyAccount().then((bool) => {
                        setCanModify(bool);
                    });
                }
            )
        } catch (e) {
            setError('Failed to load weapon.');
        }
        setLoading(false);
    }, []);

    const fetchWeapon = async () => {
        const response = await fetch(`http://localhost:8080/creator/weapon/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
            {canModify && (
                <form onSubmit={}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={weapon.name}
                        onChange={(e) => setWeapon({...weapon, name: e.target.value})}
                    />
                    <label>Tier</label>
                    <label>Trait</label>
                    <label>Range</label>
                    <label>Damage Type</label>
                    <label>Damage Die</label>
                    <select
                        value={weapon.damage.dieSize}
                        onChange={(e) => setWeapon({...weapon.damage, damage:{...damage, damageDie: e.target.value}})}
                    >
                        <option value="d4">d4</option>
                        <option value="d6">d6</option>
                        <option value="d8">d8</option>
                        <option value="d10">d10</option>
                        <option value="d12">d12</option>
                    </select>
                    <label>Base Damage</label>
                    <input
                        type="number"
                        value={weapon.damage.baseDamage}
                        onChange={(e) => setWeapon({...weapon.damage, baseDamage: e.target.value})}
                    />
                    <label>Burden</label>

                    <button type="submit" disabled={loading}>Save Changes</button>
                </form>
            )}
            <div>
                <h1>{weapon.name}</h1>
                <p>Tier: {weapon.tier}</p>
                <p>Trait: {weapon.trait}</p>
                <p>Range: {weapon.range}</p>
                <p>Damage: {weapon.damage.damageType}</p>
                <p>Damage Die: {weapon.damage.dieSize}</p>
                <p>Base Damage: {weapon.damage.baseDamage}</p>
                <p>Burden: {weapon.burden}</p>
                {weapon.feature && (
                    <div>
                        <h2>Feature</h2>
                        <p>{weapon.feature.name}</p>
                        <p>{weapon.feature.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Weapon;