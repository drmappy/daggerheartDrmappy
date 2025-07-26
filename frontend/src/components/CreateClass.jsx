import React, { useState, useEffect } from "react";
function CreateClass(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedDomain1, setSelectedDomain1] = useState("");
    const [selectedDomain2, setSelectedDomain2] = useState("");
    const [domainOptions, setDomainOptions] = useState([]);
    const [startingEvasion, setStartingEvasion] = useState(0);
    const [startingHitPoints, setStartingHitPoints] = useState(0);
    const [classItem, setClassItem] = useState("");
    const [hopeFeatures, setHopeFeatures] = useState([{name: "", description: "", type: "HOPE"}]);
    const [classFeatures, setClassFeatures] = useState([{name: "", description: "", type: "CLASS"}]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    useEffect(() => {
        fetchDomainOptions();
    }, []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));
        account.daggerheartClasses.push({
            name: name,
            description: description,
            domains: [selectedDomain1, selectedDomain2],
            startingEvasion: startingEvasion,
            startingHitPoints: startingHitPoints,
            classItem: classItem,
            hopeFeatures: hopeFeatures,
            classFeatures: classFeatures,
            subClasses:[]
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
                throw new Error("Failed to create class");
            }
            setSuccess(`Class "${name}" created successfully!`);
            localStorage.setItem("Account", JSON.stringify(account));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    const fetchDomainOptions = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/allDomains", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch domain options");
            }
            const data = await response.json();
            setDomainOptions(data);
        } catch (err) {
            setError(err.message);
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br/>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br/>
                <label>Domains</label>
                <select
                    required
                    value={selectedDomain1}
                    onChange={(e) => setSelectedDomain1(e.target.value)
                    }>
                    <option value="">Select Domain 1</option>
                    {domainOptions
                        .filter(domain => domain !== selectedDomain2)
                        .map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                </select>
                <select
                    required
                    value={selectedDomain2}
                    onChange={(e) => setSelectedDomain2(e.target.value)
                    }>
                    <option value="">Select Domain 2</option>
                    {domainOptions
                        .filter(domain => domain !== selectedDomain1)
                        .map(domain => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                </select>
                <br/>
                <label>Starting Evasion</label>
                <input
                    type="number"
                    value={startingEvasion}
                    onChange={(e) => setStartingEvasion(parseInt(e.target.value))}
                    required
                />
                <br/>
                <label>Starting Hit Points</label>
                <input
                    type="number"
                    value={startingHitPoints}
                    onChange={(e) => setStartingHitPoints(parseInt(e.target.value))}
                    required
                />
                <br/>
                <label>Class Item</label>
                <input
                    type="text"
                    value={classItem}
                    onChange={(e) => setClassItem(e.target.value)}
                    required
                />
                <br/>
                <label>Hope Features</label>
                {hopeFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...hopeFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setHopeFeatures(newFeatures);
                            }}
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...hopeFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setHopeFeatures(newFeatures);
                            }}
                        />
                        <button type="button" onClick={() => {
                            setHopeFeatures(hopeFeatures.filter((f) => f.name !== feature.name));
                        }}>Remove</button>
                    </div>
                    ))}
                <button
                    type="button"
                    onClick={() => setHopeFeatures([...hopeFeatures, {name: "", description: "", type: "HOPE"}])}
                >Add another feature</button>
                <br/>
                <label>Class Features</label>
                {classFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...classFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setClassFeatures(newFeatures);
                            }}
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...classFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setClassFeatures(newFeatures);
                            }}
                        />
                        <button type="button" onClick={() => {
                            setClassFeatures(classFeatures.filter((f) => f.name !== feature.name));
                        }}>Remove</button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setClassFeatures([...classFeatures, {name: "", description: "", type: "CLASS"}])}
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