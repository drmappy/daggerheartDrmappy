import React, { useState, useEffect } from "react";

function CreateEnemy(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tier, setTier] = useState("");
    const [tiers, setTiers] = useState([]);
    const [type, setType] = useState("");
    const [types, setTypes] = useState([]);
    const [motivesAndTactics, setMotivesAndTactics] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [hitPoints, setHitPoints] = useState(0);
    const [stress, setStress] = useState(0);
    const [attackModifier, setAttackModifier] = useState(0);
    const [damageThreshold, setDamageThreshold] = useState({
        minorToMajor: 0,
        majorToSevere: 0
    });
    const [weapon, setWeapon] = useState({});
    const [weapons, setWeapons] = useState([]);
    const [experiences, setExperiences] = useState([{
        experience: "",
        modifier: 0
    }]);
    const [features, setFeatures] = useState([
        {
            name: "",
            description: "",
            type: ""
        }
    ]);
    const enemyFeatureTypes = ["ACTION", "REACTION", "PASSIVE"];
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const account = JSON.parse(localStorage.getItem("Account"));
    useEffect(() => {
        fetchTiers();
        fetchTypes();
        fetchWeapons();
    }, []);
    const fetchTiers = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/tiers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
            });
            if (!response.ok) throw new Error("Failed to fetch tiers");
            const data = await response.json();
            setTiers(data);
            setTier(data[0]);
        } catch (error) {
            setError(error.message);
        }
    };
    const fetchTypes = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/types", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
            });
            if (!response.ok) throw new Error("Failed to fetch types");
            const data = await response.json();
            setTypes(data);
            setType(data[0]);
        } catch (error) {
            setError(error.message);
        }
    };
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
                body: JSON.stringify({
                    name,
                    description,
                    tier,
                    type,
                    motivesAndTactics,
                    difficulty,
                    hitPoints,
                    stress,
                    attackModifier,
                    damageThreshold,
                    weapon,
                    experiences,
                    features
                }),
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Tier</label>
                <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    required
                >
                    {tiers.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <label>Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <label>Motives & Tactics</label>
                <textarea
                    value={motivesAndTactics}
                    onChange={(e) => setMotivesAndTactics(e.target.value)}
                    required
                />
                <label>Difficulty</label>
                <input
                    type="number"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    required
                />
                <label>Hit Points</label>
                <input
                    type="number"
                    value={hitPoints}
                    onChange={(e) => setHitPoints(Number(e.target.value))}
                    required
                />
                <label>Stress</label>
                <input
                    type="number"
                    value={stress}
                    onChange={(e) => setStress(Number(e.target.value))}
                    required
                />
                <label>Attack Modifier</label>
                <input
                    type="number"
                    value={attackModifier}
                    onChange={(e) => setAttackModifier(Number(e.target.value))}
                    required
                />
                <h3>Damage Thresholds</h3>
                <label>Minor to Major</label>
                <input
                    type="number"
                    value={damageThreshold.minorToMajor}
                    onChange={(e) => setDamageThreshold({
                        ...damageThreshold,
                        minorToMajor: Number(e.target.value)
                    })}
                    required
                />
                <label>Major to Severe</label>
                <input
                    type="number"
                    value={damageThreshold.majorToSevere}
                    onChange={(e) => setDamageThreshold({
                        ...damageThreshold,
                        majorToSevere: Number(e.target.value)
                    })}
                    required
                />
                <label>Weapon</label>
                <select
                    value={weapon.name || ""}
                    onChange={(e) => {
                        const selectedWeapon = weapons.find(w => w.name === e.target.value);
                        setWeapon(selectedWeapon || {});
                    }}
                    required
                >
                    <option value="">Select Weapon</option>
                    {weapons.map((w) => (
                        <option key={w.name} value={w.name}>{w.name}</option>
                    ))}
                </select>
                <h3>Experiences</h3>
                {experiences.map((exp, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={exp.experience}
                            onChange={(e) => {
                                const newExperiences = [...experiences];
                                newExperiences[index] = { ...newExperiences[index], experience: e.target.value };
                                setExperiences(newExperiences);
                            }}
                            required
                        />
                        <input
                            type="number"
                            value={exp.modifier}
                            onChange={(e) => {
                                const newExperiences = [...experiences];
                                newExperiences[index] = { ...newExperiences[index], modifier: Number(e.target.value) };
                                setExperiences(newExperiences);
                            }}
                            required
                        />
                        <button type="button" onClick={() => {
                            const newExperiences = experiences.filter((_, i) => i !== index);
                            setExperiences(newExperiences);
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setExperiences([...experiences, { experience: "", modifier: 0 }])}>
                    Add Experience
                </button>
                <h3>Features</h3>
                {features.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...features];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setFeatures(newFeatures);
                            }}
                            required
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...features];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setFeatures(newFeatures);
                            }}
                            required
                        />
                        <select
                            value={feature.type}
                            onChange={(e) => {
                                const newFeatures = [...features];
                                newFeatures[index] = { ...newFeatures[index], type: e.target.value };
                                setFeatures(newFeatures);
                            }}
                            required
                        >
                            <option value="">Select Type</option>
                            {enemyFeatureTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => {
                            const newFeatures = features.filter((_, i) => i !== index);
                            setFeatures(newFeatures);
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setFeatures([...features, { name: "", description: "" }])}>
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