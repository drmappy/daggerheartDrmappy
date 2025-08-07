import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
function Enemy(){
    const [enemy, setEnemy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();
    useEffect(() => {

    })
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/creator/enemy/${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': JSON.parse(localStorage.getItem('Account')).username,
                    'password': JSON.parse(localStorage.getItem('Account')).password
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch enemy');
            }
            const data = await response.json();
            setEnemy(data);

        } catch (e) {
            setError('Failed to load enemy.');
        } finally {
            setLoading(false);
        }
    }
    return(
        <div>
            <h1>Enemy</h1>
            {error && <p className="error">{error}</p>}
            {loading ? <p>Loading enemy...</p> : (
                enemy ? (
                    <div>
                        <h2>{enemy.name}</h2>
                        <p>Description: {enemy.description}</p>
                        <h3>Tier: {enemy.tier}</h3>
                        <h3>Type: {enemy.type}</h3>
                        <h3>Motives & Tactics {enemy.motivesAndTactics}</h3>
                        <h3>Difficulty: {enemy.difficulty}</h3>
                        <h3>Hit Points: {enemy.hitPoints}</h3>
                        <h3>Armor Class: {enemy.stress}</h3>
                        <h3>Attack Bonus: {enemy.attackModifier}</h3>
                        <h3>MinorToMajor: {enemy.damageThreshold.minorToMajor}</h3>
                        <h3>MajorToSevere: {enemy.damageThreshold.majorToSevere}</h3>

                        <h3>Weapon: {enemy.weapon.name}</h3>
                        <p>Weapon Description: {enemy.weapon.description}</p>
                        <h3>Weapon trait: {enemy.weapon.trait}</h3>
                        <h3>Weapon Range: {enemy.weapon.range}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.dieSize}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.baseDamage}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.damageType}</h3>
                        <h3>Weapon Burden: {enemy.weapon.burden}</h3>
                        <h3>Weapon feature: {enemy.weapon.feature.name}</h3>
                        <p>Weapon Feature Description: {enemy.weapon.feature.description}</p>

                        <h3>Experiences</h3>
                        {enemy.experiences.map((exp, index) => (
                            <div key={index}>
                                <h4>{exp.name}</h4>
                                <p>{exp.description}</p>
                            </div>
                        ))}
                        <h3>Features</h3>
                        {enemy.features.map((feature, index) => (
                        <div key={index}>
                                <h4>{feature.name}</h4>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                ) : <p>No enemy found.</p>
            )}
        </div>
    );
}
export default Enemy;