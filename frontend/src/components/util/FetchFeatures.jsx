export const fetchFeatures = async (featureType) => {
    try {
        const response = await fetch(`http://localhost:8080/player/all?featureType=${encodeURIComponent(featureType)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch features");
        }
        return await response.json();
    } catch (e) {
        console.error("Error fetching features:", e);
        throw e;
    }
};