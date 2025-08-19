export const fetchDamageTypes = async () => {
    const response = await fetch('http://localhost:8080/creator/damageTypes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch damage types');
    }
    return await response.json();
}