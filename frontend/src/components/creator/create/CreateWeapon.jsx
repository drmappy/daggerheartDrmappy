import React, { useState, useEffect } from "react"
import { fetchFeatures } from "../../util/FetchFeatures.jsx"
import { fetchTiers } from "../../util/FetchTiers.jsx"
import { fetchTraits } from "../../util/FetchTraits.jsx"
import { fetchRanges } from "../../util/FetchRanges.jsx"
import { fetchDamageTypes } from "../../util/FetchDamageTypes.jsx"
import { fetchBurdens } from "../../util/FetchBurdens.jsx"
function CreateWeapon(){
    const [weapon, setWeapon] = useState({
        name: "",
        trait: "",
        range: "",
        damage: {
            dieSize: 0,
            baseDamage: 0,
            damageType: ""
        },
        burden: "",
        tier: "",
        feature: null
    });
    const [traits, setTraits] = useState([]);
    const [ranges, setRanges] = useState([]);
    const [damageTypes, setDamageTypes] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [burdens, setBurdens] = useState([]);
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    useEffect(() => {
        fetchFeatures("WEAPON").then((fetchedFeatures) => {
            setFeatures(fetchedFeatures);
        }).catch((err) => {
            setError(err.message);
        });
        fetchTiers().then((fetchedTiers) => {
            setTiers(fetchedTiers);
        }).catch((err) => {
            setError(err.message);
        });
        fetchTraits().then((fetchedTraits) => {
            setTraits(fetchedTraits);
        }).catch((err) => {
            setError(err.message);
        });
        fetchRanges().then((fetchedRanges) => {
            setRanges(fetchedRanges);
        }).catch((err) => {
            setError(err.message);
        });
        fetchDamageTypes().then((fetchedDamageTypes) => {
            setDamageTypes(fetchedDamageTypes);
        }).catch((err) => {
            setError(err.message);
        });
        fetchBurdens().then((fetchedBurdens) => {
            setBurdens(fetchedBurdens);
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
                body: JSON.stringify(weapon),
            });
            if (!response.ok) {
                throw new Error("Failed to create weapon");
            }
            setSuccess(`Weapon "${weapon.name}" created successfully!`);
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
                    value={weapon.name}
                    onChange={(e) => setWeapon({...weapon, name: e.target.value})}
                    required
                />
                <label>Trait</label>
                <select onChange={(e) => setWeapon({...weapon, trait: e.target.value})}>
                    {traits.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                    ))}
                </select>
                <label>Range</label>
                <select onChange={(e) => setWeapon({...weapon, range: e.target.value})}>
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
                    value={weapon.damage.dieSize}
                    onChange={(e) =>
                        setWeapon({...weapon, damage: {...weapon.damage, dieSize: Number(e.target.value)}})
                    }
                    required
                />
                <select
                    onChange={(e) =>
                        setWeapon({...weapon, damage: {...weapon.damage, damageType: e.target.value}
                        })
                    }
                    value={weapon.damage.damageType}
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
                    value={weapon.damage.baseDamage}
                    onChange={(e) =>
                        setWeapon({
                            ...weapon,
                            damage: {
                                ...weapon.damage,
                                baseDamage: Number(e.target.value)
                            }
                        })
                    }
                    required
                />
                <label>Burden</label>
                <select onChange={(e) => setWeapon({...weapon, burden: e.target.value})}
                    value={weapon.burden}
                    required
                >
                    {burdens.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
                <label>Tier</label>
                <select onChange={(e) => setWeapon({...weapon, tier: e.target.value})}
                    value={weapon.tier}
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
                    value={weapon.feature?.name || ""}
                    onChange={(e) => {
                        const selectedFeature = features.find(f => f.name === e.target.value);
                        setWeapon({...weapon,feature: selectedFeature});
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