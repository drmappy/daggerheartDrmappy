import {useState, useEffect} from "react";
import {fetchDomainOptions} from "../../util/FetchDomains.jsx";
import {fetchDomainCardTypes} from "../../util/FetchDomainCardTypes.jsx";
function CreateDomainCard() {
    const [domainCard, setDomainCard] = useState({
        level: 0,
        domain: "",
        recallCost: 0,
        cardType: "",
        name: "",
        description: ""
    });
    const [domains, setDomains] = useState([]);
    const [domainCardTypes, setDomainCardTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
        setLoading(true);
        setError("");
        setSuccess("");
        const fetchData = async () => {
            try {
                const allDomains = await fetchDomainOptions();
                setDomains(allDomains);
                const allDomainCardTypes = await fetchDomainCardTypes();
                setDomainCardTypes(allDomainCardTypes);
            } catch (err) {
                console.error("Failed to fetch domains:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    const handle = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
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
            setSuccess(`Domain Card "${domainCard.name}" created successfully!`);
            setDomainCard({});
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return(
        <div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={(e) => {
                e.preventDefault();
                handle();
            }}>
                <label>Level</label>
                <input
                    type="number"
                    value={domainCard?.level || 0}
                    onChange={(e) => setDomainCard({...domainCard, level: parseInt(e.target.value)})}
                    required
                />
                <label>Domain</label>
                <select
                    value={domainCard?.domain || ""}
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
                    value={domainCard?.recallCost || 0}
                    onChange={(e) => setDomainCard({...domainCard, recallCost: parseInt(e.target.value)})}
                    required
                />
                <label>Card Type</label>
                <select
                    value={domainCard?.cardType || ""}
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
                <label>Name</label>
                <input
                    type="text"
                    value={domainCard?.name || ""}
                    onChange={(e) => setDomainCard({...domainCard, name: e.target.value})}
                    required
                />
                <label>Description</label>
                <textarea
                    value={domainCard?.description || ""}
                    onChange={(e) => setDomainCard({...domainCard, description: e.target.value})}
                    required
                />
                <button type="submit" disabled={loading}>{loading ? "Loading" : "Create"}</button>
            </form>
        </div>
    );
}
export default CreateDomainCard;