import React, { useState, useEffect } from "react";
import { fetchDomainOptions } from "../../util/FetchDomains.jsx";
function CreateClass(){
    const [classData, setClassData] = useState({
        name: "",
        description: "",
        domains: [],
        startingEvasion: 0,
        startingHitPoints: 0,
        classItem: "",
        hopeFeatures: [
            {name: "", description: "", type: "HOPE"}
        ],
        classFeatures: [
            {name: "", description: "", type: "CLASS"}
        ],
        subClasses: []
    });
    const [domainOptions, setDomainOptions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    useEffect(() => {
        fetchDomainOptions().then((response) => {
            setDomainOptions(response);
        });
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));
        try {
            const response = await fetch("http://localhost:8080/creator/save/class", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify(classData),
            });
            if (!response.ok) {
                throw new Error("Failed to create class");
            }
            setSuccess(`Class "${classData.name}" created successfully!`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Create Class</h1>
            <p>This is the Create Class page.</p>
            <form onSubmit={handle()}>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <label>Name</label>
                <input
                    type="text"
                    value={classData.name}
                    onChange={(e) => setClassData({...classData, name: e.target.value})}
                    required
                />
                <br/>
                <label>Description</label>
                <textarea
                    value={classData.description}
                    onChange={(e) => setClassData({...classData, description: e.target.value})}
                    required
                />
                <br/>
                <label>Domains</label>
                <select
                    required
                    value={classData.domains[0] || ""}
                    onChange={(e) => setClassData({...classData, domains: [e.target.value, classData.domains[1]]})
                    }>
                    <option value="">Select Domain 1</option>
                    {domainOptions
                        .filter(domain => domain !== classData.domains[1])
                        .map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                </select>
                <select
                    required
                    value={classData.domains[1] || ""}
                    onChange={(e) => setClassData({...classData, domains: [classData.domains[0], e.target.value]})
                    }>
                    <option value="">Select Domain 2</option>
                    {domainOptions
                        .filter(domain => domain !== classData.domains[0])
                        .map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                </select>
                <br/>
                <label>Starting Evasion</label>
                <input
                    type="number"
                    value={classData.startingEvasion}
                    onChange={(e) => setClassData({...classData, startingEvasion: parseInt(e.target.value)})}
                    required
                />
                <br/>
                <label>Starting Hit Points</label>
                <input
                    type="number"
                    value={classData.startingHitPoints}
                    onChange={(e) => setClassData({...classData, startingHitPoints: parseInt(e.target.value)})}
                    required
                />
                <br/>
                <label>Class Item</label>
                <input
                    type="text"
                    value={classData.classItem}
                    onChange={(e) => setClassData({...classData, classItem: e.target.value})}
                    required
                />
                <br/>
                <label>Hope Features</label>
                {classData.hopeFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...classData.hopeFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setClassData({ ...classData, hopeFeatures: newFeatures});
                            }}
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...classData.hopeFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setClassData({ ...classData, hopeFeatures: newFeatures})
                            }}
                        />
                        <button type="button" onClick={() => {
                            const newFeatures = classData.hopeFeatures.filter((f) => f.name !== feature.name);
                            setClassData({ ...classData, hopeFeatures: newFeatures});
                        }}>Remove</button>
                    </div>
                    ))}
                <button
                    type="button"
                    onClick={() => {
                        const newFeatures = [...classData.hopeFeatures, {name: "", description: "", type: "HOPE"}];
                        setClassData({...classData, hopeFeatures: newFeatures});
                    }}
                >Add another feature</button>
                <br/>
                <label>Class Features</label>
                {classData.classFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...classData.classFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setClassData({...classData, classFeatures: newFeatures});
                            }}
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...classData.classFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setClassData({...classData, classFeatures: newFeatures});
                            }}
                        />
                        <button type="button" onClick={() => {
                            setClassFeatures(classFeatures.filter((f) => f.name !== feature.name));
                        }}>Remove</button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        const newFeatures = [...classData.classFeatures, {name: "", description: "", type: "CLASS"}];
                        setClassData({...classData, classFeatures: newFeatures});
                    }}
                >Add another feature</button>
                <br/>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Class"}
                </button>
            </form>
        </div>
    );
}
export default CreateClass;