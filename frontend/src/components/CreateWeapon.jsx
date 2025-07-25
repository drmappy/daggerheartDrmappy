import React, { useState, useEffect } from "react"
function CreateWeapon(){
    const [name, setName] = useState(null);
    const [trait, setTrait] = useState("AGILITY");
    const [range, setRange] = useState("MELEE");
    const [damage, setDamage] = useState({
        dieSize: 0,
        baseDamage: 0,
        damageType: "MAGICAL"
    });
    const [burden, setBurden] = useState("ONEHANDED");
    const [feature, setFeature] = useState(null);
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const fetchFeatures = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allFeatures", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch features");
            }
            const data = await response.json();
            setFeatures(data.filter((feature) => feature.type === "WEAPON"));
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchFeatures();
    }, []);
    const handle = () => async (e) => {

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
                <label>Feature</label>
                <select
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    required
                >
                    <option value="">Select a feature</option>
                    {features.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
                <button type="submit">Create Weapon</button>
            </form>
        </div>
    );
}
export default CreateWeapon;