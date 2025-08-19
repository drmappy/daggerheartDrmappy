export  const fetchRanges = async () => {
    const response = await fetch('http://localhost:8080/creator/ranges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch ranges');
    }
    return await response.json();
}