export const fetchEnemyTypes = async () => {
    const response = await fetch('http://localhost:8080/creator/enemyTypes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch enemy types');
    }
    return await response.json();
}