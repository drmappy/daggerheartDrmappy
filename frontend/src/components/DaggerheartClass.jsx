import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
import { fetchDomainOptions } from "./util/FetchDomains.jsx";
function DaggerheartClass() {
    const navigate = useNavigate();
    const [daggerheartClass, setDaggerheartClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canModify, setCanModify] = useState(false);
    const [allDomains, setAllDomains] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        const fetchDaggerheartClass = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/creator/class/${name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch daggerheartClass');
                }
                const data = await response.json();
                setDaggerheartClass(data);
                const bool = await verifyAccount();
                setCanModify(bool);
            } catch (e) {
                setError('Failed to load daggerheartClass.');
            } finally {
                setLoading(false);
            }
        };
        fetchDaggerheartClass();
        fetchDomainOptions().then((domains) => {
            setAllDomains(domains);
        }).catch((err) => {
            setError('Failed to load domains.');
        });
    }, [name]);
    const modfiyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/class', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(daggerheartClass)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/class/${daggerheartClass.name}`);
            })
            .catch(() => {
                setError('Failed to modify daggerheartClass.');
                setLoading(false);
            });
    }
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading daggerheartClass...</p>;
    if (!daggerheartClass) return null;

    return (
        <div>

                {canModify && (
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        modfiyInfo();
                    }}>
                        <label>Name</label>
                        <input
                            type="text"
                            value={daggerheartClass.name}
                            onChange={(e) => setDaggerheartClass({...daggerheartClass, name: e.target.value})}
                        />
                        <label>Description</label>
                        <textarea
                            value={daggerheartClass.description}
                            onChange={(e) => setDaggerheartClass({...daggerheartClass, description: e.target.value})}
                        />

                        <label>Domains</label>
                        <select
                            required
                            value={daggerheartClass.domains[0] || ''}
                            onChange={(e) => {
                                const newDomains = [e.target.value, daggerheartClass.domains[1]];
                                setDaggerheartClass({ ...daggerheartClass, domains: newDomains });
                            }}>
                            {allDomains
                                .filter(domain => domain !== daggerheartClass.domains[1])
                                .map(domain => (
                                    <option key={domain} value={domain}>{domain}</option>
                                ))}
                        </select>
                        <select
                            required
                            value={daggerheartClass.domains[1] || ''}
                            onChange={(e) => {
                                const newDomains = [daggerheartClass.domains[0], e.target.value];
                                setDaggerheartClass({ ...daggerheartClass, domains: newDomains });
                            }}>
                            {allDomains
                                .filter(domain => domain !== daggerheartClass.domains[0])
                                .map(domain => (
                                    <option key={domain} value={domain}>{domain}</option>
                                ))}
                        </select>

                        <label>Starting Evasion</label>
                        <input
                            type="number"
                            value={daggerheartClass.startingEvasion}
                            onChange={(e) => setDaggerheartClass({...daggerheartClass, startingEvasion: e.target.value})}
                        />
                        <label>Starting HitPoints</label>
                        <input
                            type="number"
                            value={daggerheartClass.startingHitPoints}
                            onChange={(e) => setDaggerheartClass({...daggerheartClass, startingHitPoints: e.target.value})}
                        />
                        <label>Class Item</label>
                        <input
                            type="text"
                            value={daggerheartClass.classItem}
                            onChange={(e) => setDaggerheartClass({...daggerheartClass, classItem: e.target.value})}
                        />

                        <label>Hope Features</label>
                        {daggerheartClass.hopeFeatures.map((feature, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const newFeatures = [...daggerheartClass.hopeFeatures];
                                        newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                        setDaggerheartClass({...daggerheartClass, hopeFeatures: newFeatures});
                                    }}
                                />
                                <input
                                    type="text"
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...daggerheartClass.hopeFeatures];
                                        newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                        setDaggerheartClass({...daggerheartClass, hopeFeatures: newFeatures});
                                    }}
                                />
                                <button type="button" onClick={() => {
                                    const newFeatures = daggerheartClass.hopeFeatures.filter((f) => f.name !== feature.name);
                                    setDaggerheartClass({...daggerheartClass, hopeFeatures: newFeatures});
                                }}>Remove</button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setDaggerheartClass({
                                    ...daggerheartClass,
                                    hopeFeatures: [...daggerheartClass.hopeFeatures, {name: "", description: "", type: "HOPE"}]
                                })
                        }
                        >Add another feature</button>
                        <br/>
                        <label>Class Features</label>
                        {daggerheartClass.classFeatures.map((feature, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={feature.name}
                                    onChange={(e) => {
                                        const newFeatures = [...daggerheartClass.classFeatures];
                                        newFeatures[index] = { ...newFeatures[index], name: e.target.value };
                                        setDaggerheartClass({...daggerheartClass, classFeatures: newFeatures});
                                    }}
                                />
                                <input
                                    type="text"
                                    value={feature.description}
                                    onChange={(e) => {
                                        const newFeatures = [...daggerheartClass.classFeatures];
                                        newFeatures[index] = { ...newFeatures[index], description: e.target.value };
                                        setDaggerheartClass({...daggerheartClass, classFeatures: newFeatures});
                                    }}
                                />
                                <button type="button" onClick={() => {
                                    const newFeatures = daggerheartClass.classFeatures.filter((f) => f.name !== feature.name);
                                    setDaggerheartClass({...daggerheartClass, classFeatures: newFeatures});
                                }}>Remove</button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setDaggerheartClass({
                                    ...daggerheartClass,
                                    classFeatures: [...daggerheartClass.classFeatures, {name: "", description: "", type: "CLASS"}]
                                })
                            }
                        >Add another feature</button>
                        <br/>
                        <button type={"submit"}>Modify</button>
                    </form>
                )}
            <div>
                <h1>{daggerheartClass.name}</h1>
                <p>Description: {daggerheartClass.description}</p>
                <h2>Domains</h2>
                <ul>
                    {daggerheartClass.domains.map((domain, index) => (
                        <li key={index}>{domain}</li>
                    ))}
                </ul>
                <h2>Starting evasion</h2>
                <p>{daggerheartClass.startingEvasion}</p>
                <h2>Starting HitPoints</h2>
                <p>{daggerheartClass.startingHitPoints}</p>
                <h2>Class Item</h2>
                <p>{daggerheartClass.classItem}</p>
                <h2>Hope Features</h2>
                <ul>
                    {daggerheartClass.hopeFeatures.map((feature, index) => (
                        <li key={index}>{feature.name}</li>
                    ))}
                </ul>
                <h2>Class Features</h2>
                <ul>
                    {daggerheartClass.classFeatures.map((feature, index) => (
                        <li key={index}>{feature.name}</li>
                    ))}
                </ul>
                <h2>SubClasses</h2>
                <ul>
                    {daggerheartClass.subClasses.map((subClass, index) => (
                        <li key={index}>{subClass.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default DaggerheartClass;