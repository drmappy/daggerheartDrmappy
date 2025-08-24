import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "../util/VerifyAccount.jsx";
function Ancestry() {
    const [ancestry, setAncestry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canModify, setCanModify] = useState(false);
    const { name } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        try {
            setLoading(true);
            setError(null);

            fetchAncestry();
        } catch (e) {
            setError('Failed to load ancestry.');
        }
    }, []);

    const fetchAncestry = async () => {
        const response = await fetch(`http://localhost:8080/creator/ancestry/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch ancestry');
        }
        const data = await response.json();
        setAncestry(data);
        const bool = await verifyAccount();
        setCanModify(bool);
        setLoading(false);
    };
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/ancestry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(ancestry)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/ancestry/${ancestry.name}`);
            })
            .catch(() => {
                setError('Failed to modify ancestry.');
            });
    };
    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading ancestry...</p>;
    if (!ancestry) return null;

    return (
        <div>
            {canModify &&
            <form onSubmit={(e)=> {
                e.preventDefault();
                modifyInfo();
            }}>
                <label>Ancestry Name</label>
                <input
                    type="text"
                    value={ancestry.name}
                    placeholder={ancestry.name}
                    onChange={(e) => setAncestry({...ancestry, name: e.target.value})}
                />

                <label>Ancestry Description</label>
                <input
                    type="text"
                    value={ancestry.description}
                    placeholder={ancestry.description}
                    onChange={(e) => setAncestry({...ancestry, description: e.target.value})}
                />
                <button type="submit"
                        disabled={loading}
                >Modify</button>
            </form>

            }
            <div>
                <h1>{ancestry.name}</h1>
                <p>Description: {ancestry.description}</p>
                <h2>Features</h2>
                <h3>1</h3>
                <h3>{ancestry.feature1.name}</h3>
                <p>{ancestry.feature1.description}</p>
                <h3>2</h3>
                <h3>{ancestry.feature2.name}</h3>
                <p>{ancestry.feature2.description}</p>
            </div>
        </div>
    );
}
export default Ancestry;