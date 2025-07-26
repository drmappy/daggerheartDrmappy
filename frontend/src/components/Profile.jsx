import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        const localUser = JSON.parse(localStorage.getItem('Account'));
        setUser(localUser);
        if (!localUser) {
            setError('No user found in localStorage.');
            setLoading(false);
            return;
        }
        try {
            if(localUser.username === undefined || localUser.password === undefined || localUser.accountType === undefined){
                throw new Error('Invalid user data in localStorage.');
            }
            const response = await fetch('http://localhost:8080/' + localUser.accountType.toLowerCase() +'/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: localUser.username, password: localUser.password }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem("Account", JSON.stringify(data));
            setUser(data);
            setError(null);
        } catch (err) {
            setError(`Erreur lors de la récupération du profil: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const checkoutCharacter = (c) => {
        localStorage.setItem('CurrentCharacter', JSON.stringify(c));
        navigate('character');
    }
    return (
        <div className="profile">
            {loading && <p>Chargement...</p>}
            {error && <p className="error">{error}</p>}
            {user && (
                <div>
                    <h1>{user.username}</h1>
                    <p>{user.accountType}</p>
                    {user.accountType && user.accountType.toLowerCase() === 'player' && Array.isArray(user.characters) && user.characters.length > 0 &&(
                        <div>
                            <h2>Mes personnages</h2>
                            <ul>
                                {user.characters.map((character, index) => (
                                    <li key={index} onClick={() => checkoutCharacter(character)}>{character.name}</li>                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
export default Profile;