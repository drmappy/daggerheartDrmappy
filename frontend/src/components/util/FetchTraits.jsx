export const fetchTraits = async () => {
    const response = await fetch('http://localhost:8080/creator/traits', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch traits');
    }
    return await response.json();
}