import React, { useState, useEffect } from 'react';
function Profile(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchUserProfile();
    }, []);
    const fetchUserProfile = async () => {
        setLoading(true);
        setUser(JSON.parse(localStorage.getItem('Account')));
        try {
            const response = await fetch('http://localhost:8080/'+ user.accountType.toLowerCase(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(`Erreur lors de la récupération du profil: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="profile">
            {loading && <p>Chargement...</p>}
            {error && <p className="error">{error}</p>}
            {user && (
                <div>
                    <h1>{user.username}</h1>
                    <p>{user.accountType}</p>
                    {Array.isArray(user.characters) && user.characters.length > 0 ? (
                        <div>
                            <h2>Mes personnages</h2>
                            <ul>
                                {user.characters.map((character, index) => (
                                    <li key={index}>{character.name}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No characters.</p>
                    )}
                </div>
            )}
        </div>
    );
}
export default Profile;