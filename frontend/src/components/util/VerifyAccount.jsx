export const verifyAccount = async () => {
    const account = JSON.parse(localStorage.getItem("Account"));
    try{
        const response = await fetch('http://localhost:8080/creator/confirmation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "username": account.username,
                "password": account.password
            }
        });
        return response.ok;
    }catch(e) {
        return false;
    }

}