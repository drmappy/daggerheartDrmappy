export const FetchDomainCardTypes = async () => {
    const response = await fetch('http://localhost:8080/creator/domainCardTypes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch domain card types');
    }
    return await response.json();
}