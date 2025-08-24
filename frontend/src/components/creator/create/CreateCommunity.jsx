import React, { useState, useEffect } from "react";
import { fetchFeatures} from "../../util/FetchFeatures.jsx";
function CreateCommunity(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [community, setCommunity] = useState({
        name: "",
        description: "",
        feature: {name: "", description: "", type: "COMMUNITY"}
    });
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allFeatures = await fetchFeatures("COMMUNITY");
                setFeatures(allFeatures);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));

        try {
            const response = await fetch("http://localhost:8080/creator/save/community", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify(community),
            });
            if (!response.ok) {
                throw new Error("Failed to create community");
            }
            setSuccess(`Community "${community.name}" created successfully!`);
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
                    value={community.name}
                    onChange={(e) => setCommunity({...community, name: e.target.value})}
                    required
                />
                <label>Description</label>
                <textarea
                    value={community.description}
                    onChange={(e) => setCommunity({...community, description: e.target.value})}
                    required
                />
                <label>Feature</label>
                <select
                    value={community.feature.name || ""}
                    onChange={(e) => setCommunity({...community, feature: features.find(f => f.name === e.target.value)})}
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