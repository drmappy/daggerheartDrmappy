import React, { useState, useEffect } from "react"
import { fetchFeatures } from "../util/FetchFeatures.jsx"
function CreateWeapon(){
    const [name, setName] = useState("");
    const [trait, setTrait] = useState("AGILITY");
    const [range, setRange] = useState("MELEE");
    const [damage, setDamage] = useState({
        dieSize: 0,
        baseDamage: 0,
        damageType: "MAGICAL"
    });
    const [tiers, setTiers] = useState([]);
    const [tier, setTier] = useState("");
    const [burden, setBurden] = useState("ONEHANDED");
    const [feature, setFeature] = useState(null);
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const fetchTiers = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/tiers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tiers");
            }
            const data = await response.json();
            setTiers(data);
            setTier(data[0]);
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchFeatures("WEAPON").then((fetchedFeatures) => {
            setFeatures(fetchedFeatures);
        }).catch((err) => {
            setError(err.message);
        });
        fetchTiers();
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));
        try {
            const response = await fetch("http://localhost:8080/creator/save/weapon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password,
                },
                body: JSON.stringify({
                    name,
                    trait,
                    range,
                    damage: {
                        dieSize: damage.dieSize,
                        baseDamage: damage.baseDamage,
                        damageType: damage.damageType
                    },
                    burden,
                    tier,
                    feature: feature ? {
                        name: feature.name,
                        description: feature.description,
                        type: feature.type
                    } : null
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create weapon");
            }
            setSuccess(`Weapon "${name}" created successfully!`);
            localStorage.setItem("Account", JSON.stringify(account));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create Weapon</h1>
            <p>This is where you can create a new weapon.</p>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handle()}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Trait</label>
                <select onChange={(e) => setTrait(e.target.value)}>
                    <option value="AGILITY">Agility</option>
                    <option value="STRENGTH">Strength</option>
                    <option value="FINESSE">Finesse</option>
                    <option value="INSTINCT">Instinct</option>
                    <option value="PRESENCE">Presence</option>
                    <option value="KNOWLEDGE">Knowledge</option>
                </select>
                <label>Range</label>
                <select onChange={(e) => setRange(e.target.value)}>
                    <option value="MELEE">Melee</option>
                    <option value="VERY_CLOSE">Very close</option>
                    <option value="CLOSE">Close</option>
                    <option value="FAR">Far</option>
                    <option value="VERY_FAR">Very Far</option>
                </select>
                <label>Damage</label>
                <select onChange={(e) => setDamage({...damage, dieSize: e.target.value})}
                    value={damage.dieSize}
                    required
                >
                    <option value="0">None</option>
                    <option value="4">d4</option>
                    <option value="6">d6</option>
                    <option value="8">d8</option>
                    <option value="10">d10</option>
                    <option value="12">d12</option>
                    <option value="20">d20</option>
                </select>
                <select onChange={(e) => setDamage({...damage, damageType: e.target.value})}
                    value={damage.damageType}
                    required
                >
                    <option value="PHYSICAL">Physical</option>
                    <option value="MAGICAL">Magical</option>
                </select>
                <input
                    type="number"
                    placeholder="Base Damage"
                    value={damage.baseDamage}
                    onChange={(e) => setDamage({...damage, baseDamage: e.target.value})
                    }
                    required
                />
                <label>Burden</label>
                <select onChange={(e) => setBurden(e.target.value)}
                    value={burden}
                    required
                >
                    <option value="ONEHANDED">One handed</option>
                    <option value="TWOHANDED">Two handed</option>
                </select>
                <label>Tier</label>
                <select onChange={(e) => setTier(e.target.value)}
                    value={tier}
                    required
                >
                    {tiers.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
                <label>Feature</label>
                <select
                    value={feature?.name || ""}
                    onChange={(e) => {
                        const selectedFeature = features.find(f => f.name === e.target.value);
                        setFeature(selectedFeature || null);
                    }}
                >
                    <option value="">Select a feature</option>
                    {features.map((feature) => (
                        <option key={feature?.name} value={feature?.name}>
                            {feature.name}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Weapon"}
                </button>
            </form>
        </div>
    );
}
export default CreateWeapon;