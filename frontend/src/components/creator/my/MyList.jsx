import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function MyList({ title, endpoint, itemPath }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError("");
                const account = JSON.parse(localStorage.getItem("Account"));
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "username": account.username,
                        "password": account.password
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const text = await response.text();
                const data = text ? JSON.parse(text) : [];
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [endpoint]);

    return (
        <div>
            <h1>{title}</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {items.map((item) => (
                    <li key={item} onClick={() => navigate(`${itemPath}/${item}`)}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyList;