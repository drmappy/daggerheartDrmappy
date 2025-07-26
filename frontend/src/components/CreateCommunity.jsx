import React, { useState, useEffect } from "react";
function CreateCommunity(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [feature, setFeature] = useState({name: "", description: ""});
    const [features, setFeatures] = useState([]);
    const fetchFeatures = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
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
            setFeatures(data.filter((feature) => feature.type === "COMMUNITY"));
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    };
    useEffect(() => {
        fetchFeatures();
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        if (!name || !description || !feature) {
            setError("Please fill in all fields and select a feature.");
            return;
        }
        const account = JSON.parse(localStorage.getItem("Account"));
        account.communities.push({
            name: name,
            description: description,
            feature: feature
        });
        try {
            const response = await fetch("http://localhost:8080/creator/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
            });
            if (!response.ok) {
                throw new Error("Failed to create community");
            }
            setSuccess(`Community "${name}" created successfully!`);
            localStorage.setItem("Account", JSON.stringify(account));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <form onSubmit={handle()}>
                <h1>Create Community</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
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
                <label>Feature</label>
                <select
                    value={feature.name || ""}
                    onChange={(e) => setFeature(features.find(f => f.name === e.target.value))}
                    required
                >
                    <option value="" disabled>Select a feature</option>
                    {features.map((f) => (
                        <option key={f.name} value={f.name}>{f.name}</option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>Create Community</button>
            </form>
        </div>
    );
}
export default CreateCommunity;