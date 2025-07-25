import React, { useState, useEffect } from "react";
function CreateSubclass(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [characterSpellTrait, setCharacterSpellTrait] = useState({});
    const [foundationFeatures, setFoundationFeatures] = useState([{ name: "", description: "" }]);
    const [specializationFeatures, setSpecializationFeatures] = useState([{ name: "", description: "" }]);
    const [masteryFeatures, setMasteryFeatures] = useState([{ name: "", description: "" }]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [classNames, setClassNames] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");

    const fetchClassNames = async () => {
        try {
            const account = JSON.parse(localStorage.getItem("Account"));
            const response = await fetch("http://localhost:8080/creator/myClasses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(account),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch class names");
            }
            const data = await response.json();
            setClassNames(data.map((cls) => cls.name));
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchClassNames();
    }
    , []);

    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        if (!name || !description || !characterSpellTrait) {
            setError("Please fill in all fields and select a character spell trait.");
            return;
        }
        const account = JSON.parse(localStorage.getItem("Account"));
        account.daggerheartClasses.filter(
            (cls) => cls.name === selectedClass
        )[0].subClasses.push({
            name: name,
            description: description,
            characterSpellTrait: characterSpellTrait,
            foundationFeatures: foundationFeatures.map((feature) => ({
                name: feature.name,
                description: feature.description
            })),
            specializationFeatures: specializationFeatures.map((feature) => ({
                name: feature.name,
                description: feature.description
            })),
            masteryFeatures: masteryFeatures.map((feature) => ({
                name: feature.name,
                description: feature.description
            }))
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
                throw new Error("Failed to create subclass");
            }
            setSuccess(`Subclass "${name}" created successfully!`);
            localStorage.setItem("Account", JSON.stringify(account));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create Subclass</h1>
            <p>This is the Create Subclass page.</p>
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
                <label>Character Spell Trait</label>
                <select
                    value={characterSpellTrait}
                    onChange={(e) => setCharacterSpellTrait(e.target.value)}
                    required
                >
                    <option value="">Select a trait</option>
                    <option value="AGILITY">AGILITY</option>
                    <option value="STRENGTH">STRENGTH</option>
                    <option value="FINESSE">FINESSE</option>
                    <option value="INSTINCT">INSTINCT</option>
                    <option value="PRESENCE">PRESENCE</option>
                    <option value="KNOWLEDGE">KNOWLEDGE</option>
                </select>
                <label>Foundation Features</label>
                {foundationFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...foundationFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setFoundationFeatures(newFeatures);
                            }}
                            required
                        />
                        <input
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...foundationFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setFoundationFeatures(newFeatures);
                            }}
                            required
                        />
                        <button type="button" onClick={() => {
                            const newFeatures = foundationFeatures.filter((_, i) => i !== index);
                            setFoundationFeatures(newFeatures);
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setFoundationFeatures([...foundationFeatures, { name: "", description: "" }])}>
                    Add Foundation Feature
                </button>
                <label>Specialization Features</label>
                {specializationFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            required
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...specializationFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setSpecializationFeatures(newFeatures);
                            }}
                        />
                        <input
                            required
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...specializationFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setSpecializationFeatures(newFeatures);
                            }}
                        />
                        <button type="button" onClick={() => {
                            const newFeatures = specializationFeatures.filter((_, i) => i !== index);
                            setSpecializationFeatures(newFeatures);
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setSpecializationFeatures([...specializationFeatures, { name: "", description: "" }])}>
                    Add Specialization Feature
                </button>
                <label>Mastery Features</label>
                {masteryFeatures.map((feature, index) => (
                    <div key={index}>
                        <input
                            required
                            type="text"
                            value={feature.name}
                            onChange={(e) => {
                                const newFeatures = [...masteryFeatures];
                                newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                setMasteryFeatures(newFeatures);
                            }}
                            placeholder={`Feature ${index + 1}`}
                        />
                        <input
                            required
                            type="text"
                            value={feature.description}
                            onChange={(e) => {
                                const newFeatures = [...masteryFeatures];
                                newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                setMasteryFeatures(newFeatures);
                            }}
                        />
                        <button type="button" onClick={() => {
                            const newFeatures = masteryFeatures.filter((_, i) => i !== index);
                            setMasteryFeatures(newFeatures);
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setMasteryFeatures([...masteryFeatures, { name: "", description: "" }])}>
                    Add Mastery Feature
                </button>
                {classNames.length > 0 && (
                    <label>Class Name</label>
                )}
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    required
                >
                    <option value="">Select a class</option>
                    {classNames.map((className, index) => (
                        <option key={index} value={className}>{className}</option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Subclass"}
                </button>
            </form>
        </div>
    );
}
export default CreateSubclass;