import React, { useState, useEffect } from "react";

function CreateCharacter(){
    const [form, setForm] = useState({
        name: "",
        pronouns: "",
        heritage: {
            ancestry: {},
            community: {},
            languages: ["",]
        },
        Modifiers: {
            evasion: 0,
            armor: 0,
            damageThreshold: {
                minorToMajor: 0,
                majorToSevere: 0
            },
            hp: 0,
            stress: 0,
            hope: 0
        },
        characterClass: {},
        subClass: {},
        stress: 0,
        traits: {
            agility: 0,
            strength: 0,
            instinct: 0,
            knowledge: 0,
            presence: 0
        },
        equipment: {
            primary:{},
            secondary: {},
            activeArmor: {},
        },
        experiences: [
            {
                experience: "",
                modifier: 0,
            }
        ],
        gold:{
            handfuls: 0,
            bags: 0,
            chest: 0
        },
        inventory: {
            items: [],
            weapons: [],
            armor: [],
        },
        imageBinaryData: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subClasses, setSubClasses] = useState([]);
    const [ancestries, setAncestries] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [armors, setArmors] = useState([]);
    useEffect(
        () => {
            fetchAncestries();
            fetchClasses();
            fetchSubClasses();
            fetchCommunities();
            fetchWeapons();
            fetchArmors();
        },[]
    );
    const fetchClasses = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allClasses');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setClasses(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des classes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    const fetchSubClasses = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allSubClasses');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSubClasses(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des sous-classes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    const fetchAncestries = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allAncestries');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAncestries(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des ancestries: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    const fetchCommunities = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allCommunities');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCommunities(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des communautés: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    const fetchWeapons = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allWeapons');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setWeapons(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des armes: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    const fetchArmors = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/player/allArmors');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setArmors(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors du chargement des armures: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    function setIn(obj, path, value) {
        const keys = path.split('.');
        let temp = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!temp[keys[i]]) temp[keys[i]] = {};
            temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return { ...obj };
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prevForm => setIn({ ...prevForm }, name, value));
    }
    const handleClassChange = async (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === "characterClass") {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/player/${value}/subClasses`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setSubClasses(data);
                setError(null);
            } catch (err) {
                setError(`Erreur lors du chargement des sous-classes: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        const requestBody = {
            ...form,
            heritage: {
                ...form.heritage,
                ancestry: form.heritage.ancestry,
                community: form.heritage.community,
                languages: form.heritage.languages.map(lang => lang.id)
            },
            characterClass: form.characterClass,
            subClass: form.subClass,
            equipment: {
                primary: form.equipment.primary,
                secondary: form.equipment.secondary,
                activeArmor: form.equipment.activeArmor
            },
            experiences: form.experiences.map(exp => ({
                experience: exp.experience,
                modifier: exp.modifier
            })),
            gold: {
                handfuls: form.gold.handfuls,
                bags: form.gold.bags,
                chest: form.gold.chest
            }
        };
        let storageData = localStorage.getItem('Account');
        let account;
        account = await fetch('http://localhost:8080/player/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(JSON.parse(storageData))
        }).then(r => {
            if (!r.ok) {
                throw new Error(`HTTP error! Status: ${r.status}`);
            }
            return r.json();
        })

        account.characters = account.characters || [];
        account.characters.push(requestBody);
        await fetch('http://localhost:8080/player/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setSuccess(true);
                setForm({
                    name: "",
                    pronouns: "",
                    heritage: {
                        ancestry: {},
                        community: {},
                        languages: []
                    },
                    Modifiers: {
                        evasion: 0,
                        armor: 0,
                        damageThreshold: {
                            minorToMajor: 0,
                            majorToSevere: 0
                        },
                        hp: 0,
                        stress: 0,
                        hope: 0
                    },
                    characterClass: {},
                    subClass: {},
                    traits: {
                        agility: 0,
                        strength: 0,
                        instinct: 0,
                        knowledge: 0,
                        presence: 0
                    },
                    equipment: {
                        primary: {},
                        secondary: {},
                        activeArmor: {},
                    },
                    experiences: [
                        {
                            experience: "",
                            modifier: 0,
                        }
                    ],
                    gold: {
                        handfuls: 0,
                        bags: 0,
                        chest: 0
                    },
                    inventory: {
                        items: [],
                        weapons: [],
                        armor: [],
                    },
                    imageBinaryData: ""
                });
            })
            .catch(err => {
                setError(`Erreur lors de la création du personnage : ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Pronouns:</label>
                <input
                    type="text"
                    name="pronouns"
                    value={form.pronouns}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Heritage Ancestry:</label>
                <select
                    name="heritage.ancestry"
                    value={form.heritage.ancestry}
                    onChange={handleChange}
                >
                    {ancestries.map((ancestry) => (
                        <option key={ancestry.id} value={ancestry.id}>
                            {ancestry.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Heritage Community:</label>
                <select
                    name="heritage.community"
                    value={form.heritage.community}
                    onChange={handleChange}
                >
                    {communities.map((community) => (
                        <option key={community.id} value={community.id}>
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Languages:</label>
                <div>
                    {form.heritage.languages.map((lang, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name={`heritage.languages[${index}]`}
                                value={lang}
                                onChange={(e) => {
                                    const newLanguages = [...form.heritage.languages];
                                    newLanguages[index] = e.target.value;
                                    setForm({
                                        ...form,
                                        heritage: {
                                            ...form.heritage,
                                            languages: newLanguages
                                        }
                                    });
                                }}
                                placeholder="Language"
                            />
                            <button onClick={(e) => {
                                e.preventDefault();
                                const newLanguages = form.heritage.languages.filter((_, i) => i !== index);
                                setForm({
                                    ...form,
                                    heritage: {
                                        ...form.heritage,
                                        languages: newLanguages
                                    }
                                });
                            }}>Remove</button>
                        </div>
                    ))}
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    setForm({
                        ...form,
                        heritage: {
                            ...form.heritage,
                            languages: [
                                ...form.heritage.languages,
                                ""
                            ]
                        }
                    });
                }}>Add a new language box</button>
            </div>
            <div>
                <label>Character Class:</label>
                <select
                    name="characterClass"
                    value={form.characterClass}
                    onChange={handleClassChange}
                >
                    {classes.map((characterClass) => (
                        <option key={characterClass.id} value={characterClass.id}>
                            {characterClass.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Sub Class:</label>
                <select
                    name="subClass"
                    value={form.subClass}
                    onChange={handleChange}
                >
                    {subClasses.map((subClass) => (
                        <option key={subClass.id} value={subClass.id}>
                            {subClass.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Traits:</label>
                <br/>
                <label>Agility:</label>
                <input
                    type="number"
                    name="traits.agility"
                    value={form.traits.agility}
                    onChange={handleChange}
                    placeholder="Agility"
                />
                <br/>
                <label>Strength:</label>
                <input
                    type="number"
                    name="traits.strength"
                    value={form.traits.strength}
                    onChange={handleChange}
                    placeholder="Strength"
                />
                <br/>
                <label>Instinct:</label>
                <input
                    type="number"
                    name="traits.instinct"
                    value={form.traits.instinct}
                    onChange={handleChange}
                    placeholder="Instinct"
                />
                <br/>
                <label>Knowledge:</label>
                <input
                    type="number"
                    name="traits.knowledge"
                    value={form.traits.knowledge}
                    onChange={handleChange}
                    placeholder="Knowledge"
                />
                <br/>
                <label>Presence:</label>
                <input
                    type="number"
                    name="traits.presence"
                    value={form.traits.presence}
                    onChange={handleChange}
                    placeholder="Presence"
                />
            </div>
            <div>
                <label>Modifiers Evasion:</label>
                <input
                    type="number"
                    name="Modifiers.evasion"
                    value={form.Modifiers.evasion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers Armor:</label>
                <input
                    type="number"
                    name="Modifiers.armor"
                    value={form.Modifiers.armor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers Damage Threshold Minor to Major:</label>
                <input
                    type="number"
                    name="Modifiers.damageThreshold.minorToMajor"
                    value={form.Modifiers.damageThreshold.minorToMajor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers Damage Threshold Major to Severe:</label>
                <input
                    type="number"
                    name="Modifiers.damageThreshold.majorToSevere"
                    value={form.Modifiers.damageThreshold.majorToSevere}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers HP:</label>
                <input
                    type="number"
                    name="Modifiers.hp"
                    value={form.Modifiers.hp}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers Stress:</label>
                <input
                    type="number"
                    name="Modifiers.stress"
                    value={form.Modifiers.stress}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Modifiers Hope:</label>
                <input
                    type="number"
                    name="Modifiers.hope"
                    value={form.Modifiers.hope}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Equipment Primary:</label>
                <select
                    name="equipment.primary"
                    value={form.equipment.primary}
                    onChange={handleChange}
                >
                    {weapons.map((weapon) => (
                        <option key={weapon.id} value={weapon}>
                            {weapon.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Equipment Secondary:</label>
                <select
                    name="equipment.secondary"
                    value={form.equipment.secondary}
                    onChange={handleChange}
                >
                    {weapons.map((weapon) => (
                        <option key={weapon.id} value={weapon.id}>
                            {weapon.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Equipment Active Armor:</label>
                <select
                    name="equipment.activeArmor"
                    value={form.equipment.activeArmor}
                    onChange={handleChange}
                >
                    {armors.map((armor) => (
                        <option key={armor.id} value={armor.id}>
                            {armor.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Experiences:</label>
                <div>
                    {form.experiences.map((exp, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name={`experiences[${index}].experience`}
                                value={exp.experience}
                                onChange={(e) => {
                                    const newExperiences = [...form.experiences];
                                    newExperiences[index].experience = e.target.value;
                                    setForm({ ...form, experiences: newExperiences });
                                }}
                                placeholder="Experience"
                            />
                            <input
                                type="number"
                                name={`experiences[${index}].modifier`}
                                value={exp.modifier}
                                onChange={(e) => {
                                    const newExperiences = [...form.experiences];
                                    newExperiences[index].modifier = parseInt(e.target.value, 10);
                                    setForm({ ...form, experiences: newExperiences });
                                }}
                                placeholder="Modifier"
                            />
                            <button onClick={(e) => {
                                e.preventDefault();
                                const newExperiences = form.experiences.filter((_, i) => i !== index);
                                setForm({ ...form, experiences: newExperiences });
                            }}>Remove</button>
                        </div>
                    ))}
                </div>
                <button onClick={
                    (e) => {
                        e.preventDefault();
                        setForm({
                            ...form,
                            experiences: [
                                ...form.experiences,
                                { experience: "", modifier: 0 }
                            ]
                        });
                    }
                }>Add a new experience box</button>
            </div>
            <div>
                <label>Gold Handfuls:</label>
                <input
                    type="number"
                    name="gold.handfuls"
                    value={form.gold.handfuls}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Gold Bags:</label>
                <input
                    type="number"
                    name="gold.bags"
                    value={form.gold.bags}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Gold Chest:</label>
                <input
                    type="number"
                    name="gold.chest"
                    value={form.gold.chest}
                    onChange={handleChange}
                />
            </div>
            <p>{JSON.stringify(weapons)}</p>
            <p>{JSON.stringify(form)}</p>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Character created successfully!</div>}
            <button type="submit">Create Character</button>
        </form>
    );
}
export default CreateCharacter;