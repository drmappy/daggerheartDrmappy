import React, { useState, useEffect } from "react";
function CreateAncestry(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [feature1, setFeature1] = useState({
        name: "",
        description: "",
        type: "",
    });
    const [feature2, setFeature2] = useState({
        name: "",
        description: "",
        type: "",
    });
    const [features, setFeatures] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
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
            setFeatures(data.filter((feature) => feature.type === "ANCESTRY"));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFeatures();
    }, []);
    const handleSubmit = () => async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");
        setLoading(true);
        const account = JSON.parse(localStorage.getItem("Account"));
        try {
            const response = await fetch("http://localhost:8080/creator/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify({
                    name,
                    description,
                    feature1: {
                        name: feature1.name,
                        description: feature1.description,
                        type: feature1.type,
                    },
                    feature2: {
                        name: feature2.name,
                        description: feature2.description,
                        type: feature2.type
                    }
                })
            });
            if (!response.ok) {
                throw new Error("Failed to create ancestry");
            }
            setSuccess(`Ancestry "${name}" created successfully!`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create Ancestry</h1>
            <p>This is where you can create a new ancestry for your game.</p>
            <form onSubmit={handleSubmit()}>
                <div>
                    <label htmlFor="name">Ancestry Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Feature1:</label>
                    <select
                        value={feature1.name}
                        onChange={(e) => {
                            const selectedFeature = features.find(f => f.name === e.target.value);
                            setFeature1(selectedFeature || { name: "", description: "", type: "" });
                        }}
                    >
                        <option value="">Select Feature 1</option>
                        {features.filter(feature => feature.name !== feature2.name).map((feature) => (
                            <option key={feature.name} value={feature.name}>
                                {feature.name}
                            </option>
                        ))}
                    </select>
                    <label>Feature2:</label>
                    <select
                        value={feature2.name}
                        onChange={(e) => {
                            const selectedFeature = features.find(f => f.name === e.target.value);
                            setFeature2(selectedFeature || { name: "", description: "", type: "" });
                        }}
                    >
                        <option value="">Select Feature 2</option>
                        {features.filter(feature => feature.name !== feature1.name).map((feature) => (
                            <option key={feature.name} value={feature.name}>
                                {feature.name}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Ancestry"}
                </button>
            </form>
        </div>
    );
}
export default CreateAncestry;