import React, { useState } from "react";
function CreateFeature(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("WEAPON");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));

        try {
            const response = await fetch("http://localhost:8080/creator/save/feature", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify({
                    name,
                    description,
                    type
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create feature");
            }
            setSuccess(`Feature "${name}" created successfully!`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create Feature</h1>
            <p>This component will allow users to create features.</p>
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
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Type</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="WEAPON">Weapon</option>
                    <option value="ARMOR">Armor</option>
                    <option value="ANCESTRY">Ancestry</option>
                    <option value="COMMUNITY">Community</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Feature"}
                </button>
            </form>
        </div>
    );
}
export default CreateFeature;