export const fetchDomainOptions = async () => {
    try {
        const response = await fetch("http://localhost:8080/creator/allDomains", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch domain options");
        }
        return await response.json();
    } catch (err) {
        throw err;
    }
}