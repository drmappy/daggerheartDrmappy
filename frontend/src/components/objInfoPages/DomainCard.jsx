import { useState, useEffect } from 'react';
import {useParams} from "react-router";
import { verifyAccount} from "../util/VerifyAccount.jsx";
import { useNavigate } from "react-router";
import { fetchDomainOptions } from "../util/FetchDomains.jsx";
import { fetchDomainCardTypes } from "../util/FetchDomainCardTypes.jsx";

function DomainCard () {
    const [domainCard, setDomainCard] = useState({});
    const [canModify, setCanModify] = useState(false);
    const [domains, setDomains] = useState([]);
    const [domainCardTypes, setDomainCardTypes] = useState([]);
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        fetchDomainCard();
        verifyAccount().then((bool) => {
            setCanModify(bool);
        });
        fetchDomainOptions().then(options => {
            setDomains(options);
        }).catch(error => {
            setError("Failed to fetch domain options: " + error.message);
        });
        fetchDomainCardTypes().then(options => {
            setDomainCardTypes(options);
        }).catch(error => {
            setError("Failed to fetch domain card types: " + error.message);
        })
    }, []);
    const fetchDomainCard = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/creator/domainCard/${name}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDomainCard(data);
        } catch (error) {
            setError('Failed to fetch domain card: ' + error.message);
        }
        setLoading(false);
    };
    const handle = async () => {
        setLoading(true);
        setError(null);
        const account = JSON.parse(localStorage.getItem("Account"));
        try {
            const response = await fetch("http://localhost:8080/creator/save/domainCard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "username": account.username,
                    "password": account.password
                },
                body: JSON.stringify(domainCard),
            });
            if (!response.ok) {
                throw new Error("Failed to create domain card");
            }
            navigate(`/creator/domain_card/${domainCard.name}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
        {canModify && (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handle();
                }}
            >
                <label>Level</label>
                <input
                    type="number"
                    value={domainCard.level || 0}
                    onChange={(e) => setDomainCard({...domainCard, level: e.target.value})}
                    required
                />
                <label>Domain</label>
                <select
                    value={domainCard.domain || ''}
                    onChange={(e) => setDomainCard({...domainCard, domain: e.target.value})}
                    required
                >
                    <option value="">Select Domain</option>
                    {domains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>
                <label>Recall Cost</label>
                <input
                    type="number"
                    value={domainCard.recallCost || 0}
                    onChange={(e) => setDomainCard({...domainCard, recallCost: e.target.value})}
                    required
                />
                <label>Card Type</label>
                <select
                    value={domainCard.cardType || ''}
                    onChange={(e) => setDomainCard({...domainCard, cardType: e.target.value})}
                    required
                >
                    <option value="">Select Card Type</option>
                    {domainCardTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <label>Card Name</label>
                <input
                    type="text"
                    value={domainCard.name || ''}
                    onChange={(e) => setDomainCard({...domainCard, name: e.target.value})}
                    required
                />
                <label>Card Description</label>
                <input
                    type="text"
                    value={domainCard.description || ''}
                    onChange={(e) => setDomainCard({...domainCard, description: e.target.value})}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Domain Card"}
                </button>
            </form>
        )}
        {error && <p>{error}</p>}
        <h1>Domain Card Details</h1>
        {loading ? <p>Loading domain card...</p> :
            <div>
                <p>Level: {domainCard.level}</p>
                <p>Domain: {domainCard.domain}</p>
                <p>Recall Cost: {domainCard.recallCost}</p>
                <p>Card Type: {domainCard.cardType}</p>
                <p>Card Name: {domainCard.name}</p>
                <p>Card Description: {domainCard.description}</p>
            </div>
        }
    </div>
  );
}
export default DomainCard;