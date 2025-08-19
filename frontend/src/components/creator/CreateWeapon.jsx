import React, { useState, useEffect } from "react"
import { fetchFeatures } from "../util/FetchFeatures.jsx"
import { fetchTiers } from "../util/FetchTiers.jsx"
import { fetchTraits } from "../util/FetchTraits.jsx"
import { fetchRanges } from "../util/FetchRanges.jsx"
import { fetchDamageTypes } from "../util/FetchDamageTypes.jsx"
import { fetchBurdens } from "../util/FetchBurdens.jsx"
function CreateWeapon(){
    const [name, setName] = useState("");
    const [traits, setTraits] = useState([]);
    const [trait, setTrait] = useState("");
    const [ranges, setRanges] = useState([]);
    const [range, setRange] = useState("");
    const [damage, setDamage] = useState({
        dieSize: 0,
        baseDamage: 0,
        damageType: ""
    });
    const [damageTypes, setDamageTypes] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [tier, setTier] = useState("");
    const [burdens, setBurdens] = useState([]);
    const [burden, setBurden] = useState("");
    const [feature, setFeature] = useState(null);
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    useEffect(() => {
        fetchFeatures("Weapons").then((fetchedFeatures) => {
            setFeatures(fetchedFeatures);
        }).catch((err) => {
            setError(err.message);
        });
        fetchTiers().then((fetchedTiers) => {
            setTiers(fetchedTiers);
            if (fetchedTiers.length > 0) {
                setTier(fetchedTiers[0]);
            }
        }).catch((err) => {
            setError(err.message);
        });
        fetchTraits().then((fetchedTraits) => {
            setTraits(fetchedTraits);
            if (fetchedTraits.length > 0) {
                setTrait(fetchedTraits[0]);
            }
        }).catch((err) => {
            setError(err.message);
        });
        fetchRanges().then((fetchedRanges) => {
            setRanges(fetchedRanges);
            if (fetchedRanges.length > 0) {
                setRange(fetchedRanges[0]);
            }
        }).catch((err) => {
            setError(err.message);
        });
        fetchDamageTypes().then((fetchedDamageTypes) => {
            setDamageTypes(fetchedDamageTypes);
            if(fetchedDamageTypes.length > 0) {
                setDamage({...damage, damageType: fetchedDamageTypes[0]});
            }
        }).catch((err) => {
            setError(err.message);
        });
        fetchBurdens().then((fetchedBurdens) => {
            setBurdens(fetchedBurdens);
            if (fetchedBurdens.length > 0) {
                setBurden(fetchedBurdens[0]);
            }
        }).catch((err) => {
            setError(err.message);
        });
        setLoading(false);
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
                    {traits.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                    ))}
                </select>
                <label>Range</label>
                <select onChange={(e) => setRange(e.target.value)}>
                    {ranges.map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                    ))}
                </select>
                <label>Damage</label>
                <input
                    type="number"
                    placeholder="Die Size"
                    value={damage.dieSize}
                    onChange={(e) => setDamage({...damage, dieSize: e.target.value})}
                    required
                />
                <select onChange={(e) => setDamage({...damage, damageType: e.target.value})}
                    value={damage.damageType}
                    required
                >
                    {damageTypes.map((dt) => (
                        <option key={dt} value={dt}>
                            {dt}
                        </option>
                    ))}
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
                    {burdens.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
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