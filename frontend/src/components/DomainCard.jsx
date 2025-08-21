import { useState, useEffect } from 'react';
import {useParams} from "react-router";
function DomainCard () {
    const [domainCard, setDomainCard] = useState({});
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetchDomainCard();
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
  return (
    <div>
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