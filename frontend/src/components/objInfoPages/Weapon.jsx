import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "../util/VerifyAccount.jsx";
import { fetchWeapon } from "../util/FetchWeapon.jsx";
import { fetchTiers } from "../util/FetchTiers.jsx";
import { fetchTraits } from "../util/FetchTraits.jsx";
import { fetchRanges } from "../util/FetchRanges.jsx";
import { fetchDamageTypes } from "../util/FetchDamageTypes.jsx";
import { fetchBurdens } from "../util/FetchBurdens.jsx";
function Weapon(){
    const navigate = useNavigate();
    const [canModify, setCanModify] = useState(false);
    const [weapon, setWeapon] = useState(null);
    const [tiers, setTiers] = useState([]);
    const [traits, setTraits] = useState([]);
    const [ranges, setRanges] = useState([]);
    const [damageTypes, setDamageTypes] = useState([]);
    const [burdens, setBurdens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            fetchWeapon(name).then(
                (data) => {
                    setWeapon(data);
                    verifyAccount().then((bool) => {
                        setCanModify(bool);
                    });
                    fetchTiers().then(setTiers);
                    fetchTraits().then(setTraits);
                    fetchRanges().then(setRanges);
                    fetchDamageTypes().then(setDamageTypes);
                    fetchBurdens().then(setBurdens);
                }
            )
        } catch (e) {
            setError('Failed to load weapon.');
        }
        setLoading(false);
    }, []);
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/weapon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(weapon)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/weapon/${weapon.name}`);
            })
            .catch(() => {
                setError('Failed to modify weapon.');
            });
    }
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading weapon...</p>;
    if (!weapon) return null;

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
                        value={weapon.name}
                        onChange={(e) => setWeapon({...weapon, name: e.target.value})}
                    />
                    <label>Tier</label>
                    <select
                        value={weapon.tier}
                        onChange={(e) => setWeapon({...weapon, tier: e.target.value})}
                    >
                        {tiers.map((tier) => (
                            <option key={tier} value={tier}>{tier}</option>
                        ))}
                    </select>
                    <label>Trait</label>
                    <select
                        value={weapon.trait}
                        onChange={(e) => setWeapon({...weapon, trait: e.target.value})}
                    >
                        {traits.map((trait) => (
                            <option key={trait} value={trait}>{trait}</option>
                        ))}
                    </select>
                    <label>Range</label>
                    <select
                        value={weapon.range}
                        onChange={(e) => setWeapon({...weapon, range: e.target.value})}
                    >
                        {ranges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                    <label>Damage Type</label>
                    <select
                        value={weapon.damage.damageType}
                        onChange={(e) => setWeapon({...weapon, damage:{
                            ...weapon.damage, damageType: e.target.value
                            }})}
                    >
                        {damageTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label>Damage Die</label>
                    <select
                        value={weapon.damage.dieSize}
                        onChange={(e) => setWeapon({...weapon, damage:{...weapon.damage, dieSize: e.target.value}})}
                    >
                        <option value="0">0</option>
                        <option value="2">d2</option>
                        <option value="4">d4</option>
                        <option value="6">d6</option>
                        <option value="8">d8</option>
                        <option value="10">d10</option>
                        <option value="12">d12</option>
                        <option value="20">d20</option>
                    </select>
                    <label>Base Damage</label>
                    <input
                        type="number"
                        value={weapon.damage.baseDamage}
                        onChange={(e) => setWeapon({...weapon, damage:{...weapon.damage, baseDamage: e.target.value}})}
                    />
                    <label>Burden</label>
                    <select
                        value={weapon.burden}
                        onChange={(e) => setWeapon({...weapon, burden: e.target.value})}
                    >
                        {burdens.map((burden) => (
                            <option key={burden} value={burden}>{burden}</option>
                        ))}
                    </select>
                    <div onClick={() => navigate(`/creator/weapon/${weapon.feature.name}/feature`)}>
                        <p>Navigate to modify feature</p>
                    </div>
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
                    <div onClick={() => navigate(`/creator/weapon/${weapon.feature.name}/feature`)}>
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