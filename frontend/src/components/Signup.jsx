import {useState, useEffect} from "react";
import { useNavigate } from 'react-router';

function Signup(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('creator');
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('Account');
        localStorage.removeItem('CurrentData');
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/' + accountType + '/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const saveData = {
                username: username,
                password: password,
                accountType: accountType
            }
            localStorage.setItem('Account', JSON.stringify({
                username: username,
                password: password,
                accountType: accountType
            }));
            navigate(`/${accountType}`);
        } catch (err) {
            setError(`Erreur lors de l'inscription: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>SIGNUP</h1>
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
                            {loading ? 'Signup en cours...' : 'Signup'}
                        </button>
                        {error && <div>{error}</div>}
                    </div>
            </form>
        </div>
    );
}
export default Signup;