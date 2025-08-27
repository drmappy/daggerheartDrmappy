import {useEffect, useState} from "react";
import { useNavigate } from 'react-router';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('creator');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (w) => {
        w.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/' + accountType + '/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            localStorage.setItem('Account', JSON.stringify({
                username: username,
                password: password,
                accountType: accountType
            }));
            navigate(`/${accountType}`);
        } catch (error) {
            setError(`Erreur lors de la connexion: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">USERNAME</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label htmlFor="password">PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <label htmlFor="accountType">TYPE OF ACCOUNT:</label>
                <div>
                    <input
                        type="radio"
                        id="creator"
                        name="accountType"
                        value="creator"
                        onChange={(e) => setAccountType(e.target.value)}
                        defaultChecked
                    />
                    <label htmlFor="creator">CREATOR</label>
                    <input
                        type="radio"
                        id="player"
                        name="accountType"
                        value="player"
                        onChange={(e) => setAccountType(e.target.value)}
                    />
                    <label htmlFor="player">PLAYER</label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Login en cours...' : 'Login'}
                </button>
                {error && <div>{error}</div>}
            </div>
        </form>
        </div>
    );
}
export default Login;