import React, { useState, useEffect } from "react";
import {fetchEnemyTypes} from "../../util/FetchEnemyTypes.jsx";
import {fetchTiers} from "../../util/FetchTiers.jsx";

function CreateEnemy(){
    const [enemy, setEnemy] = useState({
        name: "",
        description: "",
        tier: "",
        type: "",
        motivesAndTactics: "",
        difficulty: 0,
        hitPoints: 0,
        stress: 0,
        attackModifier: 0,
        damageThreshold: {
            minorToMajor: 0,
            majorToSevere: 0
        },
        weapon: {},
        experiences: [{
            experience: "",
            modifier: 0
        }],
        features: [
            {
                name: "",
                description: "",
                type: ""
            }
        ]
    });
    const [tiers, setTiers] = useState([]);
    const [types, setTypes] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const enemyFeatureTypes = ["ACTION", "REACTION", "PASSIVE"];
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const account = JSON.parse(localStorage.getItem("Account"));
    useEffect(() => {
        fetchTiers().then((response) => {
            setEnemy({...enemy, tier: response[0]});
            setTiers(response);
        }).catch((error) => {
            setError(error);
        })
        fetchEnemyTypes().then((response) => {
            setEnemy({...enemy, type: response[0]});
            setTypes(response);
        }).catch((error) => {
            setError(error);
        })
        fetchWeapons();
    }, []);
    const fetchWeapons = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allWeapons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
            });
            if (!response.ok) throw new Error("Failed to fetch weapons");
            const data = await response.json();
            setWeapons(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            const response = await fetch("http://localhost:8080/creator/save/enemy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify(enemy),
            });
            if (!response.ok) throw new Error("Failed to create enemy");
            setSuccess(`Enemy "${name}" created successfully!`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    value={enemy.name}
                    onChange={(e) => setEnemy({...enemy, name: e.target.value})}
                    required
                />
                <label>Description</label>
                <textarea
                    value={enemy.description}
                    onChange={(e) => setEnemy({...enemy, description: e.target.value})}
                    required
                />
                <label>Tier</label>
                <select
                    value={enemy.tier}
                    onChange={(e) => setEnemy({...enemy, tier: e.target.value})}
                    required
                >
                    {tiers.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <label>Type</label>
                <select
                    value={enemy.type}
                    onChange={(e) => setEnemy({...enemy, type: e.target.value})}
                    required
                >
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <label>Motives & Tactics</label>
                <textarea
                    value={enemy.motivesAndTactics}
                    onChange={(e) => setEnemy({...enemy, motivesAndTactics: e.target.value})}
                    required
                />
                <label>Difficulty</label>
                <input
                    type="number"
                    value={enemy.difficulty}
                    onChange={(e) => setEnemy({...enemy, difficulty: Number(e.target.value)})}
                    required
                />
                <label>Hit Points</label>
                <input
                    type="number"
                    value={enemy.hitPoints}
                    onChange={(e) => setEnemy({...enemy, hitPoints: Number(e.target.value)})}
                    required
                />
                <label>Stress</label>
                <input
                    type="number"
                    value={enemy.stress}
                    onChange={(e) => setEnemy({...enemy, stress: Number(e.target.value)})}
                    required
                />
                <label>Attack Modifier</label>
                <input
                    type="number"
                    value={enemy.attackModifier}
                    onChange={(e) => setEnemy({...enemy, attackModifier: Number(e.target.value)})}
                    required
                />
                <h3>Damage Thresholds</h3>
                <label>Minor to Major</label>
                <input
                    type="number"
                    value={enemy.damageThreshold.minorToMajor}
                    onChange={(e) => setEnemy({
                        ...enemy,
                        damageThreshold: {
                            ...enemy.damageThreshold,
                            minorToMajor: Number(e.target.value)
                        }
                    })}
                    required
                />
                <label>Major to Severe</label>
                <input
                    type="number"
                    value={enemy.damageThreshold.majorToSevere}
                    onChange={(e) => setEnemy({
                        ...enemy,
                        damageThreshold: {
                            ...enemy.damageThreshold,
                            majorToSevere: Number(e.target.value)
                        }
                    })}
                    required
                />
                <label>Weapon</label>
                <select
                    value={enemy.weapon.name || ""}
                    onChange={(e) => {
                        const selectedWeapon = weapons.find(w => w.name === e.target.value);
                        setEnemy({...enemy, weapon: selectedWeapon});
                    }}
                    required
                >
                    <option value="">Select Weapon</option>
                    {weapons.map((w) => (
                        <option key={w.name} value={w.name}>{w.name}</option>
                    ))}
                </select>
                <h3>Experiences</h3>
                {enemy.experiences.map((exp, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={exp.experience}
                            onChange={(e) => {
                                const newExperiences = [...enemy.experiences];
                                newExperiences[index] = { ...newExperiences[index], experience: e.target.value };
                                setEnemy({...enemy, experiences: newExperiences});
                            }}
                            required
                        />
                        <input
                            type="number"
                            value={exp.modifier}
                            onChange={(e) => {
                                const newExperiences = [...enemy.experiences];
                                newExperiences[index] = { ...newExperiences[index], modifier: Number(e.target.value) };
                                setEnemy({...enemy, experiences: newExperiences});
                            }}
                            required
                        />
                        <button type="button" onClick={() => {
                            const newExperiences = enemy.experiences.filter((_, i) => i !== index);
                            setEnemy({...enemy, experiences: newExperiences});
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setEnemy(
                    {...enemy, experiences: [...enemy.experiences, { experience: "", modifier: 0 }]})}>
                    Add Experience
                </button>
                <h3>Features</h3>
                {enemy.features.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...enemy.features];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setEnemy({...enemy, features: newFeatures});
                            }}
                            required
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...enemy.features];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setEnemy({...enemy, features: newFeatures});
                            }}
                            required
                        />
                        <select
                            value={feature.type}
                            onChange={(e) => {
                                const newFeatures = [...enemy.features];
                                newFeatures[index] = { ...newFeatures[index], type: e.target.value };
                                setEnemy({...enemy, features: newFeatures});
                            }}
                            required
                        >
                            <option value="">Select Type</option>
                            {enemyFeatureTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => {
                            const newFeatures = enemy.features.filter((_, i) => i !== index);
                            setEnemy({...enemy, features: newFeatures});
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setEnemy({...enemy, features: [...enemy.features, { name: "", description: "", type: "" }]})}>
                    Add Feature
                </button>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Enemy"}
                </button>
            </form>
        </div>
    );
}
export default CreateEnemy;