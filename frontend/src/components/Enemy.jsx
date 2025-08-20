import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
import { fetchTiers } from "./util/FetchTiers.jsx";
import { fetchEnemyTypes } from "./util/FetchEnemyTypes.jsx";
function Enemy(){
    const navigate = useNavigate();
    const [canModify, setCanModify] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [tiers, setTiers] = useState([]);
    const [enemyTypes, setEnemyTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchEnemyTypes().then(
            (e)=>{
                setEnemyTypes(e)
            }
        ).catch(
            setError('Failed to load enemy types.')
        )
        fetchTiers().then((e)=>{setTiers(e)}).catch(setError('Failed to load tiers.'));
        fetchData().then(
            () => {
                verifyAccount().then((bool) => {
                    setCanModify(bool);
                });
                setLoading(false);
            }
        ).catch(
            (e) => {
                setError('Failed to load enemy.');
                setLoading(false);
            }
        )
    },[name])
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/creator/enemy/${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
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
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/enemy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(enemy)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/enemy/${enemy.name}`);
            })
            .catch(() => {
                setError('Failed to modify enemy.');
            });
    }
    return(
        <div>
            {canModify && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    modifyInfo();
                }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={enemy ? enemy.name : ''}
                        onChange={(e) => setEnemy({ ...enemy, name: e.target.value })}
                    />
                    <label>Description</label>
                    <textarea
                        value={enemy ? enemy.description : ''}
                        onChange={(e) => setEnemy({ ...enemy, description: e.target.value })}
                    />
                    <label>Tier</label>
                    <select
                        value={enemy ? enemy.tier : ''}
                        onChange={(e) => setEnemy({ ...enemy, tier: e.target.value })}
                    >
                        {tiers.map((tier) => (
                            <option key={tier} value={tier}>{tier}</option>
                        ))}
                    </select>
                    <label>Type</label>
                    <select
                        value={enemy ? enemy.type : ''}
                        onChange={(e) => setEnemy({ ...enemy, type: e.target.value })}
                    >
                        {enemyTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <label>Motives & Tactics</label>
                    <input
                        type="text"
                        value={enemy ? enemy.motivesAndTactics : ''}
                        onChange={(e) => setEnemy({ ...enemy, motivesAndTactics: e.target.value })}
                    />
                    <label>Difficulty</label>
                    <input
                        type="number"
                        value={enemy ? enemy.difficulty : ''}
                        onChange={(e) => setEnemy({ ...enemy, difficulty: e.target.value })}
                    />
                    <label>Hit Points</label>
                    <input
                        type="number"
                        value={enemy ? enemy.hitPoints : ''}
                        onChange={(e) => setEnemy({ ...enemy, hitPoints: e.target.value })}
                    />
                    <label>Stress</label>
                    <input
                        type="number"
                        value={enemy ? enemy.stress : ''}
                        onChange={(e) => setEnemy({ ...enemy, stress: e.target.value })}
                    />
                    <label>Attack Modifier</label>
                    <input
                        type="number"
                        value={enemy ? enemy.attackModifier : ''}
                        onChange={(e) => setEnemy({ ...enemy, attackModifier: e.target.value })}
                    />
                    <label>Minor To Major</label>
                    <input
                        type="number"
                        value={enemy ? enemy.damageThreshold.minorToMajor : ''}
                        onChange={(e) => setEnemy({ ...enemy, damageThreshold: { ...enemy.damageThreshold, minorToMajor: e.target.value } })}
                    />
                    <label>Major To Severe</label>
                    <input
                        type="number"
                        value={enemy ? enemy.damageThreshold.majorToSevere : ''}
                        onChange={(e) => setEnemy({ ...enemy, damageThreshold: { ...enemy.damageThreshold, majorToSevere: e.target.value } })}
                    />
                    <label>Experiences</label>
                    {enemy.experience && enemy.experience.map((experience, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={experience.experience}
                                onChange={(e) => {
                                    const newExperiences = enemy.experience.map((exp) =>
                                        exp.experience === experience.experience ? { ...exp, experience: e.target.value } : exp
                                    );
                                    setEnemy({ ...enemy, experience: newExperiences });
                                }}
                            />
                            <input
                                type="number"
                                value={experience.modifier}
                                onChange={(e) => {
                                    const newExperiences = enemy.experience.map((exp) =>
                                        exp.experience === experience.experience ? { ...exp, modifier: e.target.value } : exp
                                    );
                                    setEnemy({ ...enemy, experience: newExperiences });
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    const newExperiences = enemy.experience.filter((exp) => exp.experience !== experience.experience);
                                    setEnemy({ ...enemy, experience: newExperiences });
                                }}
                            >remove</button>
                        </div>
                        ))}
                    <button
                        type="button"
                        onClick={() => setEnemy({ ...enemy, experience: [...(enemy.experience || []), { experience: '', modifier: 0 }] })}
                    >Add another experience</button>
                    <label>Features</label>
                    {enemy.features && enemy.features.map((feature, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={feature.name}
                                onChange={(e) => {
                                    const newFeatures = enemy.features.map((f) =>
                                        f.name === feature.name ? { ...f, name: e.target.value } : f
                                    );
                                    setEnemy({ ...enemy, features: newFeatures });
                                }}
                            />
                            <textarea
                                value={feature.description}
                                onChange={(e) => {
                                    const newFeatures = enemy.features.map((f) =>
                                        f.name === feature.name ? { ...f, description: e.target.value } : f
                                    );
                                    setEnemy({ ...enemy, features: newFeatures });
                                }}
                            />
                            <label>Type</label>
                            <select
                                value={feature.type}
                                onChange={(e) => {
                                    const newFeatures = enemy.features.map((f) =>
                                        f.name === feature.name ? { ...f, type: e.target.value } : f
                                    );
                                    setEnemy({ ...enemy, features: newFeatures });
                                }}
                            >
                                <option value="ACTION">Action</option>
                                <option value="REACTION">Reaction</option>
                                <option value="PASSIVE">Passive</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    const newFeatures = enemy.features.filter((f) => f.name !== feature.name);
                                    setEnemy({ ...enemy, features: newFeatures });
                                }}
                            >remove</button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setEnemy({ ...enemy, features: [...(enemy.features || []), { name: '', description: '', type: 'ACTION' }] })}
                    >Add another feature</button>
                    <button type={"submit"} disabled={loading}>
                        {loading ? "Saving..." : "Modify"}
                    </button>
                </form>
            )}
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
                        <h3>Stress: {enemy.stress}</h3>
                        <h3>Attack Bonus: {enemy.attackModifier}</h3>
                        <h3>MinorToMajor: {enemy.damageThreshold.minorToMajor}</h3>
                        <h3>MajorToSevere: {enemy.damageThreshold.majorToSevere}</h3>

                        <h3>Weapon: {enemy.weapon.name}</h3>
                        <h3>Weapon trait: {enemy.weapon.trait}</h3>
                        <h3>Weapon Range: {enemy.weapon.range}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.dieSize}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.baseDamage}</h3>
                        <h3>Weapon Damage: {enemy.weapon.damage.damageType}</h3>
                        <h3>Weapon Burden: {enemy.weapon.burden}</h3>
                        {enemy.weapon.feature?.name && <p>Weapon Feature Name: {enemy.weapon.feature.name}</p>}
                        {enemy.weapon.feature?.description && <p>Weapon Feature Description: {enemy.weapon.feature.description}</p>}
                        <h3>Experiences</h3>
                        {enemy.experience?.map((exp, index) => (
                            <div key={index}>
                                <h4>{exp.experience}</h4>
                                <p>{exp.modifier}</p>
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