import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
function Subclass() {
    const navigate = useNavigate();
    const [canModify, setCanModify] = useState(false);
    const [subclass, setSubclass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            fetchSubclass().then(
                () => {
                    verifyAccount().then((bool) => {
                        setCanModify(bool);
                    });
                })
        } catch (e) {
            setError('Failed to load subclass.');
        }
        setLoading(false);
    }, []);

    const fetchSubclass = async () => {
        const response = await fetch(`http://localhost:8080/creator/subclass/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch subclass');
        }
        const data = await response.json();
        setSubclass(data);
    };
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/subclass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(subclass)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/subclass/${subclass.name}`);
            })
            .catch(() => {
                setError('Failed to modify subclass.');
            });
    }
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading subclass...</p>;
    if (!subclass) return null;

    return (
        <div>
            {canModify && (
                <form onSubmit={(e) =>{
                    e.preventDefault();
                    modifyInfo();
                }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={subclass.name}
                        onChange={(e) => setSubclass({...subclass, name: e.target.value})}
                    />
                    <label>Description</label>
                    <textarea
                        value={subclass.description}
                        onChange={(e) => setSubclass({...subclass, description: e.target.value})}
                    />
                    <label>Spellcasting Trait</label>
                    <label>Foundation Features</label>
                    {
                        subclass.foundationFeatures.map((feature, index) => (
                            <div key={index}>
                                <label>Feature Name</label>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.foundationFeatures];
                                        newFeatures[index].name = e.target.value;
                                        setSubclass({...subclass, foundationFeatures: newFeatures});
                                    }}
                                />
                                <label>Feature Description</label>
                                <textarea
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.foundationFeatures];
                                        newFeatures[index].description = e.target.value;
                                        setSubclass({...subclass, foundationFeatures: newFeatures});
                                    }}
                                />
                            </div>
                        ))
                    }
                    <label>Specialization Features</label>
                    {
                        subclass.specializationFeatures.map((feature, index) => (
                            <div key={index}>
                                <label>Feature Name</label>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.specializationFeatures];
                                        newFeatures[index].name = e.target.value;
                                        setSubclass({...subclass, specializationFeatures: newFeatures});
                                    }}
                                />
                                <label>Feature Description</label>
                                <textarea
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.specializationFeatures];
                                        newFeatures[index].description = e.target.value;
                                        setSubclass({...subclass, specializationFeatures: newFeatures});
                                    }}
                                />
                            </div>
                        ))
                    }
                    <label>Mastery Features</label>
                    {
                        subclass.masteryFeatures.map((feature, index) => (
                            <div key={index}>
                                <label>Feature Name</label>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.masteryFeatures];
                                        newFeatures[index].name = e.target.value;
                                        setSubclass({...subclass, masteryFeatures: newFeatures});
                                    }}
                                />
                                <label>Feature Description</label>
                                <textarea
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...subclass.masteryFeatures];
                                        newFeatures[index].description = e.target.value;
                                        setSubclass({...subclass, masteryFeatures: newFeatures});
                                    }}
                                />
                            </div>
                        ))
                    }
                    <button type="submit" disabled={loading}>Modify</button>
                </form>
            )}
            <div>
                <h1>{subclass.name}</h1>
                <p>Description: {subclass.description}</p>
                <p>Spell casting trait: {subclass.spellcastingTrait}</p>
                <h2>Foundation Features</h2>
                <ul>
                    {subclass.foundationFeatures.map((feature, index) => (
                        <li key={index}>
                            <h3>{feature.name}</h3>
                            <p>{feature.description}</p>
                        </li>
                    ))}
                </ul>
                <h2>Specialization Features</h2>
                <ul>
                    {subclass.specializationFeatures.map((feature, index) => (
                        <li key={index}>
                            <h3>{feature.name}</h3>
                            <p>{feature.description}</p>
                        </li>
                    ))}
                </ul>
                <h2>Mastery Features</h2>
                <ul>
                    {subclass.masteryFeatures.map((feature, index) => (
                        <li key={index}>
                            <h3>{feature.name}</h3>
                            <p>{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Subclass;