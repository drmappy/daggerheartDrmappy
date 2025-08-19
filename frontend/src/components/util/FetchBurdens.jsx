export const fetchBurdens = async () => {
    const response = await fetch('http://localhost:8080/creator/burdens', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch burdens');
    }
    return await response.json();
}