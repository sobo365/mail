export function authHeader() {
    // return authorization header with basic auth credentials
    let token = JSON.parse(localStorage.getItem('token'));

    return { 'Authorization': 'Bearer ' + token };
    
}