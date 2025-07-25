import React, { useState, useEffect } from "react";
function CreateArmor() {
    const [armorData, setArmorData] = useState({
        name: "",
        minorToMajor: 0,
        majorToSevere: 0,
        baseArmorScore: 0,
        feature: null
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [features, setFeatures] = useState([]);
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
            setFeatures(data.filter((feature) => feature.type === "ARMOR"));
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchFeatures();
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));
        account.armors.push(armorData);
        try {
            const response = await fetch("http://localhost:8080/creator/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
            });
            if (!response.ok) {
                throw new Error("Failed to create armor");
            }
            setSuccess(`Armor "${armorData.name}" created successfully!`);
            localStorage.setItem("Account", JSON.stringify(account));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create Armor</h1>
            <p>This is the Create Armor page.</p>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handle()}>
                <label>Name</label>
                <input
                    type="text"
                    value={armorData.name}
                    onChange={(e) => setArmorData({...armorData, name: e.target.value})}
                    required
                />
                <label>Minor to Major</label>
                <input
                    type="number"
                    value={armorData.minorToMajor}
                    onChange={(e) => setArmorData({...armorData, minorToMajor: parseInt(e.target.value)})}
                    required
                />
                <label>Major to Severe</label>
                <input
                    type="number"
                    value={armorData.majorToSevere}
                    onChange={(e) => setArmorData({...armorData, majorToSevere: parseInt(e.target.value)})}
                    required
                />
                <label>Base Armor Score</label>
                <input
                    type="number"
                    value={armorData.baseArmorScore}
                    onChange={(e) => setArmorData({...armorData, baseArmorScore: parseInt(e.target.value)})}
                    required
                />
                <label>Feature</label>
                <select
                    value={armorData.feature?.name || ""}
                    onChange={(e) => {
                        const selectedFeature = features.find(f => f.name === e.target.value);
                        setArmorData({...armorData, feature: selectedFeature || null});
                    }}
                >
                    <option value="">Select a feature</option>
                    {features.map((feature) => (
                        <option key={feature?.name} value={armorData.feature?.name}>
                            {feature.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Create Armor</button>
            </form>
        </div>
    );
}
export default CreateArmor;