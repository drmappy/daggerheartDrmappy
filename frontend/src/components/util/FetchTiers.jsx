export const fetchTiers = async () => {
    const response = await fetch('http://localhost:8080/creator/tiers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tiers');
    }
    return await response.json();
}