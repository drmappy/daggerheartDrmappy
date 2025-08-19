export const fetchWeapon = async (name) => {
    const response = await fetch(`http://localhost:8080/creator/weapon/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch weapon');
    }
    return await response.json();
};