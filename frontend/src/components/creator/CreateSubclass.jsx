import React, { useState, useEffect } from "react";
function CreateSubclass(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [characterSpellTrait, setCharacterSpellTrait] = useState();

    const [characterSpellTraits, setCharacterSpellTraits] = useState([]);
    const [foundationFeatures, setFoundationFeatures] = useState([{ name: "", description: "" }]);
    const [specializationFeatures, setSpecializationFeatures] = useState([{ name: "", description: "" }]);
    const [masteryFeatures, setMasteryFeatures] = useState([{ name: "", description: "" }]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [classNames, setClassNames] = useState([]);
    const [selectedClassName, setSelectedClassName] = useState("");

    const fetchClassNames = async () => {
        try {
            const account = JSON.parse(localStorage.getItem("Account"));
            const response = await fetch("http://localhost:8080/creator/myClasses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password,
                },
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
    const fetchCharacterSpellTraits = async () => {
        try {
            const response = await fetch("http://localhost:8080/creator/getAllCharacterSpellTraits", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch character spell traits");
            }
            const data = await response.json();
            setCharacterSpellTraits(data);
        } catch (err) {
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchClassNames();
        fetchCharacterSpellTraits();
    }
    , []);
    const handle = () => async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const account = JSON.parse(localStorage.getItem("Account"));
        try {
            const response = await fetch("http://localhost:8080/creator/save/subclass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password,
                    "className": selectedClassName,
                },
                body: JSON.stringify(
                    {
                        name,
                        description,
                        spellCastingTrait: characterSpellTrait,
                        foundationFeatures: foundationFeatures.map(feature => ({
                            name: feature.name,
                            description: feature.description,
                        })),
                        specializationFeatures: specializationFeatures.map(feature => ({
                            name: feature.name,
                            description: feature.description,
                        })),
                        masteryFeatures: masteryFeatures.map(feature => ({
                            name: feature.name,
                            description: feature.description,
                        })),
                    }
                ),
            });
            if (!response.ok) {
                throw new Error("Failed to create subclass");
            }
            setSuccess(`Subclass "${name}" created successfully!`);
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
                    {characterSpellTraits.map((trait, index) => (
                        <option key={index} value={trait}>{trait}</option>
                    ))}
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
                    value={selectedClassName}
                    onChange={(e) => setSelectedClassName(e.target.value)}
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