export const verifyAccount = async () => {
    const account = JSON.parse(localStorage.getItem("Account"));
    try{
        await fetch('http://localhost:8080/creator/confirmation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "username": account.username,
                "password": account.password
            }
        });
        return true;
    }catch(e) {
        return false;
    }

}