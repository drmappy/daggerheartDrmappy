import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
function Community(){
    const navigate = useNavigate();
    const [community, setCommunity] = useState(null);
    const [canModify, setCanModify] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            verifyAccount().then((bool) => {
                setCanModify(bool);
            });
            setLoading(true);
            setError(null);
            fetchCommunity();
        } catch (e) {
            setError('Failed to load community.');
        }
        setLoading(false);
    }, []);
    const modifyInfo = () => {
        setLoading(true);
        fetch('http://localhost:8080/creator/save/community', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': JSON.parse(localStorage.getItem("Account")).username,
                'password': JSON.parse(localStorage.getItem("Account")).password
            },
            body: JSON.stringify(community)
        })
            .then(() => {
                setError(null);
                setLoading(false);
                navigate(`/creator/community/${community.name}`);
            })
            .catch(() => {
                setError('Failed to modify community.');
            });
    }
    const fetchCommunity = async () => {
        const response = await fetch(`http://localhost:8080/creator/community/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch community');
        }
        const data = await response.json();
        setCommunity(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading community...</p>;
    if (!community) return null;

    return (
        <div>
            {canModify && (
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    modifyInfo();
                }}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={community.name}
                        onChange={(e) => setCommunity({...community, name: e.target.value})}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={community.description}
                        onChange={(e) => setCommunity({...community, description: e.target.value})}
                    />
                    <button type="submit"
                            disabled={loading}
                    >
                        Modify
                    </button>
                </form>
            )}
            <div>
                <h1>{community.name}</h1>
                <p>Description: {community.description}</p>
                <h2>Feature</h2>
                <h3>{community.feature.name}</h3>
                <p>{community.feature.description}</p>
            </div>
        </div>
    );
}
export default Community;