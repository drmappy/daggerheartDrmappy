import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('Account')));
    const [characterNames, setCharacterNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        const localUser = JSON.parse(localStorage.getItem('Account'));
        if (!localUser) {
            setError('No user found in localStorage.');
            setLoading(false);
            return;
        }
        try {
            if (!localUser.username || !localUser.password || !localUser.accountType) {
                throw new Error('Invalid user data in localStorage.');
            }
            const response = await fetch(`http://localhost:8080/${localUser.accountType.toLowerCase()}/confirmation`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': localUser.username,
                    'password': localUser.password
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUser({
                username: localUser.username,
                accountType: localUser.accountType
            })
            if(localUser.accountType.toLowerCase() === 'player') {
                await fetchCharacterNames(localUser.username, localUser.password);
            }
            setError(null);
        } catch (err) {
            setError(`Erreur lors de la récupération du profil: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    const fetchCharacterNames = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/player/characterNames', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'username': username,
                    'password': password
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const text = await response.text();
            const data = text ? JSON.parse(text) : [];
            setCharacterNames(data);
        } catch (err) {
            setError(`Erreur lors de la récupération des personnages: ${err.message}`);
        }
    };

    const checkoutCharacter = (name) => {
        if (!name) {
            console.error('Invalid character name:', name);
            return;
        }
        navigate('/player/character/' + name);
    };

    return (
        <div className="profile">
            {loading && <p>Chargement...</p>}
            {error && <p className="error">{error}</p>}
            {user && (
                <div>
                    <h1>{user.username}</h1>
                    <p>{user.accountType}</p>
                    {user.accountType && user.accountType.toLowerCase() === 'player' && characterNames.length > 0 && (
                        <div>
                            <h2>Mes personnages</h2>
                            <ul>
                                {characterNames.map((name, index) => (
                                    name ? (
                                        <li key={index} onClick={() => checkoutCharacter(name)}>
                                            {name}
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;