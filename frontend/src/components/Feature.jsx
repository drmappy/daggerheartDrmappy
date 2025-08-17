import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from "react-router";
import { verifyAccount } from "./util/VerifyAccount.jsx";
function Feature(){
    const navigate = useNavigate();
    const [canModify, setCanModify] = useState(false);
    const [feature, setFeature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        try {
            setLoading(true);
            setError(null);
            fetchFeature().then(
                () => {
                    verifyAccount().then((bool) => {
                        setCanModify(bool);
                    });
                }
            );
        } catch (e) {
            setError('Failed to load feature.');
        }
        setLoading(false);
    }, []);

    const fetchFeature = async () => {
        const response = await fetch(`http://localhost:8080/creator/feature/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch feature');
        }
        const data = await response.json();
        setFeature(data);
    };

    if (error) return <p>{error}</p>;
    if (loading) return <p>Loading feature...</p>;
    if (!feature) return null;

    return (
        <div>
            <h1>{feature.name}</h1>
            <p>Description: {feature.description}</p>
            <p>Type: {feature.type}</p>
        </div>
    );
}
export default Feature;