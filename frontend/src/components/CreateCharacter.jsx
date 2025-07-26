import React, { useState, useEffect } from "react";

function CreateCharacter(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, setName] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [heritage, setHeritage] = useState({
        ancestry: null,
        community: null,
        languages: [],
    });
    const [allAncestories, setAllAncestries] = useState([]);
    const [allCommunities, setAllCommunities] = useState([]);
    const [modifiers, setModifiers] = useState({
        evasion: 0,
        armor: 0,
        damageThreshold: 0,
        hp: 0,
        stress: 0,
        hope: 0
    });
    const [characterClass, setCharacterClass] = useState({
    });
    const [allClasses, setAllClasses] = useState([]);
    const [subclass, setSubclass] = useState({
    });
    const [allSubclasses, setAllSubclasses] = useState([]);
    const [stress, setStress] = useState({
    });
    const [traits, setTraits] = useState({
        agility: 0,
        strength: 0,
        finesse: 0,
        instinct: 0,
        presence: 0,
        knowledge: 0
    });
    const [equipment, setEquipment] = useState({
        primary: null,
        secondary: null,
        activeArmor: null
    });
    const [allWeapons, setAllWeapons] = useState([]);
    const [allArmors, setAllArmors] = useState([]);
    const [experiences, setExperiences] = useState([
        {
            experience: "",
            modifier: 0
        }
    ]);
    const [gold, setGold] = useState({
        handfuls: 0,
        bags: 0,
        chest: 0,
    });
    const [inventory, setInventory] = useState({
        items: [""],
        weapons: [],
        armors: [],
    });
    const [imageBinaryData, setImageBinaryData] = useState("");
    //TODO finish the form
    const handle = () => async (e) => {
    }
    useEffect(() => {
        getAllAncestries();
        getAllCommunities();
        getAllClasses();
        getAllSubclasses(characterClass.name);
        getAllWeapons();
        getAllArmors();
        setLoading(false);
    }, [])
    const getAllAncestries = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allAncestries", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch ancestries");
            }
            const data = await response.json();
            setAllAncestries(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const getAllCommunities = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allCommunities", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch communities");
            }
            const data = await response.json();
            setAllCommunities(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const getAllClasses = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allClasses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch classes");
            }
            const data = await response.json();
            setAllClasses(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const getAllSubclasses = async (className) => {
        try {
            const response = await fetch(`http://localhost:8080/player/${className}/subClasses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch subclasses");
            }
            const data = await response.json();
            setAllSubclasses(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const getAllWeapons = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allWeapons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch weapons");
            }
            const data = await response.json();
            setAllWeapons(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const getAllArmors = async () => {
        try {
            const response = await fetch("http://localhost:8080/player/allArmors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch armors");
            }
            const data = await response.json();
            setAllArmors(data);
        } catch (err) {
            setError(err.message);
        }
    }
    return(
        <div>
            <form onSubmit={handle()}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br/>
                <label>Pronouns:</label>
                <input
                    type="text"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                    required
                />
                <br/>
                <label>Ancestry:</label>
                <select
                    value={heritage.ancestry || ""}
                    onChange={(e) => setHeritage({...heritage, ancestry: e.target.value
                    })}
                    required
                >
                    <option value="">Select Ancestry</option>
                    {allAncestories.map((ancestry) => (
                        <option key={ancestry.name} value={ancestry.name}>
                            {ancestry.name}
                        </option>
                    ))}
                </select>
                <br/>
                <label>Community:</label>
                <select
                    value={heritage.community || ""}
                    onChange={(e) => setHeritage({...heritage, community: e.target.value
                    })}
                    required
                >
                    <option value="">Select Community</option>
                    {allCommunities.map((community) => (
                        <option key={community.name} value={community.name}>
                            {community.name}
                        </option>
                    ))}
                </select>
                <br/>
                <label>Languages:</label>
                <div>
                    {heritage.languages.map((language, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={language}
                                onChange={(e) => {
                                    const newLanguages = [...heritage.languages];
                                    newLanguages[index] = e.target.value;
                                    setHeritage({...heritage, languages: newLanguages});
                                }}
                            />
                            <button type="button" onClick={() => {
                                const newLanguages = heritage.languages.filter((_, i) => i !== index);
                                setHeritage({...heritage, languages: newLanguages});
                            }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => {
                        setHeritage({...heritage, languages: [...heritage.languages, ""]});
                    }}>Add Language</button>
                </div>
                <br/>
                <label>Modifiers:</label>
                <div>
                    <label>Evasion:</label>
                    <input
                        type="number"
                        value={modifiers.evasion}
                        onChange={(e) => setModifiers({...modifiers, evasion: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Armor:</label>
                    <input
                        type="number"
                        value={modifiers.armor}
                        onChange={(e) => setModifiers({...modifiers, armor: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Damage Threshold:</label>
                    <input
                        type="number"
                        value={modifiers.damageThreshold}
                        onChange={(e) => setModifiers({...modifiers, damageThreshold: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>HP:</label>
                    <input
                        type="number"
                        value={modifiers.hp}
                        onChange={(e) => setModifiers({...modifiers, hp: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Stress:</label>
                    <input
                        type="number"
                        value={modifiers.stress}
                        onChange={(e) => setModifiers({...modifiers, stress: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Hope:</label>
                    <input
                        type="number"
                        value={modifiers.hope}
                        onChange={(e) => setModifiers({...modifiers, hope: parseInt(e.target.value)})}
                        required
                    />
                </div>
                <br/>
                <label>Character Class:</label>
                <select
                    value={characterClass.name}
                    onChange={(e) => {
                        const selectedClass = allClasses.find(c => c.name === e.target.value);
                        setCharacterClass(selectedClass || {});
                        getAllSubclasses(e.target.value);
                    }}
                    required
                >
                    <option value="">Select Class</option>
                    {allClasses.map((characterClass) => (
                        <option key={characterClass.name} value={characterClass.name}>
                            {characterClass.name}
                        </option>
                    ))}
                </select>
                <br/>
                <label>Subclass:</label>
                <select
                    value={subclass.name}
                    onChange={(e) => {
                        const selectedSubclass = allSubclasses.find(sc => sc.name === e.target.value);
                        setSubclass(selectedSubclass || {});
                    }}
                    required
                >
                    <option value="">Select Subclass</option>
                    {allSubclasses.map((subclass) => (
                        <option key={subclass.name} value={subclass.name}>
                            {subclass.name}
                        </option>
                    ))}
                </select>
                <br/>
                <label>Stress:</label>
                <input
                    type="number"
                    value={stress.value || ""}
                    onChange={(e) => setStress({...stress, value: parseInt(e.target.value)})}
                    required
                />
                <br/>
                <label>Traits:</label>
                <div>
                    <label>Agility:</label>
                    <input
                        type="number"
                        value={traits.agility}
                        onChange={(e) => setTraits({...traits, agility: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Strength:</label>
                    <input
                        type="number"
                        value={traits.strength}
                        onChange={(e) => setTraits({...traits, strength: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Finesse:</label>
                    <input
                        type="number"
                        value={traits.finesse}
                        onChange={(e) => setTraits({...traits, finesse: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Instinct:</label>
                    <input
                        type="number"
                        value={traits.instinct}
                        onChange={(e) => setTraits({...traits, instinct: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Presence:</label>
                    <input
                        type="number"
                        value={traits.presence}
                        onChange={(e) => setTraits({...traits, presence: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Knowledge:</label>
                    <input
                        type="number"
                        value={traits.knowledge}
                        onChange={(e) => setTraits({...traits, knowledge: parseInt(e.target.value)})}
                        required
                    />
                </div>
                <br/>
                <label>Equipment:</label>
                <div>
                    <label>Primary Weapon:</label>
                    <select
                        value={equipment.primary?.name || ""}
                        onChange={(e) => {
                            const selectedWeapon = allWeapons.find(w => w.name === e.target.value);
                            setEquipment({...equipment, primary: selectedWeapon || null});
                        }}
                        required
                    >
                        <option value="">Select Primary Weapon</option>
                        {allWeapons.map((weapon) => (
                            <option key={weapon.name} value={weapon.name}>
                                {weapon.name}
                            </option>
                        ))}
                    </select>
                    <br/>
                    <label>Secondary Weapon:</label>
                    <select
                        value={equipment.secondary?.name || ""}
                        onChange={(e) => {
                            const selectedWeapon = allWeapons.find(w => w.name === e.target.value);
                            setEquipment({...equipment, secondary: selectedWeapon || null});
                        }}
                        required
                    >
                        <option value="">Select Secondary Weapon</option>
                        {allWeapons.map((weapon) => (
                            <option key={weapon.name} value={weapon.name}>
                                {weapon.name}
                            </option>
                        ))}
                    </select>
                    <br/>
                    <label>Active Armor:</label>
                    <select
                        value={equipment.activeArmor?.name || ""}
                        onChange={(e) => {
                            const selectedArmor = allArmors.find(a => a.name === e.target.value);
                            setEquipment({...equipment, activeArmor: selectedArmor || null});
                        }}
                        required
                    >
                        <option value="">Select Active Armor</option>
                        {allArmors.map((armor) => (
                            <option key={armor.name} value={armor.name}>
                                {armor.name}
                            </option>
                        ))}
                    </select>
                    <br/>
                </div>
                <label>Experiences:</label>
                <div>
                    {experiences.map((experience, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={experience.experience}
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].experience = e.target.value;
                                    setExperiences(newExperiences);
                                }}
                                required
                            />
                            <input
                                type="number"
                                value={experience.modifier}
                                onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].modifier = parseInt(e.target.value);
                                    setExperiences(newExperiences);
                                }}
                                required
                            />
                            <button type="button" onClick={() => {
                                const newExperiences = experiences.filter((_, i) => i !== index);
                                setExperiences(newExperiences);
                            }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => {
                        setExperiences([...experiences, { experience: "", modifier: 0 }]);
                    }}>Add Experience</button>
                </div>
                <br/>
                <label>Gold:</label>
                <div>
                    <label>Handfuls:</label>
                    <input
                        type="number"
                        value={gold.handfuls}
                        onChange={(e) => setGold({...gold, handfuls: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Bags:</label>
                    <input
                        type="number"
                        value={gold.bags}
                        onChange={(e) => setGold({...gold, bags: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                    <label>Chest:</label>
                    <input
                        type="number"
                        value={gold.chest}
                        onChange={(e) => setGold({...gold, chest: parseInt(e.target.value)})}
                        required
                    />
                    <br/>
                </div>
                <label>Inventory:</label>
                <div>
                    {inventory.items.map((item, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...inventory.items];
                                    newItems[index] = e.target.value;
                                    setInventory({...inventory, items: newItems});
                                }}
                                required
                            />
                            <button type="button" onClick={() => {
                                const newItems = inventory.items.filter((_, i) => i !== index);
                                setInventory({...inventory, items: newItems});
                            }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => {
                        setInventory({...inventory, items: [...inventory.items, ""]});
                    }}>Add Item</button>
                    <br/>
                    <label>Weapons:</label>
                    <select
                        value={inventory.weapons.map(w => w.name) || []}
                        onChange={(e) => {
                            const selectedWeapons = Array.from(e.target.selectedOptions, option => option.value);
                            const newWeapons = selectedWeapons.map(name => allWeapons.find(w => w.name === name));
                            setInventory({...inventory, weapons: newWeapons});
                        }}
                        multiple
                        required
                    >
                        {allWeapons.map((weapon) => (
                            <option key={weapon.name} value={weapon.name}>
                                {weapon.name}
                            </option>
                        ))}
                    </select>
                    <br/>
                    <label>Armors:</label>
                    <select
                        value={inventory.armors.map(a => a.name) || []}
                        onChange={(e) => {
                            const selectedArmors = Array.from(e.target.selectedOptions, option => option.value);
                            const newArmors = selectedArmors.map(name => allArmors.find(a => a.name === name));
                            setInventory({...inventory, armors: newArmors});
                        }}
                        multiple
                        required
                    >
                        {allArmors.map((armor) => (
                            <option key={armor.name} value={armor.name}>
                                {armor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                {/*<label>Image:</label>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    accept="image/*"*/}
                {/*    onChange={(e) => {*/}
                {/*        const file = e.target.files[0];*/}
                {/*        if (file) {*/}
                {/*            const reader = new FileReader();*/}
                {/*            reader.onloadend = () => {*/}
                {/*                setImageBinaryData(reader.result);*/}
                {/*            };*/}
                {/*            reader.readAsDataURL(file);*/}
                {/*        }*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<br/>*/}
                {/*{imageBinaryData && (*/}
                {/*    <img src={imageBinaryData} alt="Character" style={{ maxWidth: "200px", maxHeight: "200px" }} />*/}
                {/*)}*/}
            </form>
            <button type={"submit"} disabled={loading}>
                {loading ? "Loading..." : "Create Character"}
            </button>
        </div>
    );
}
export default CreateCharacter;