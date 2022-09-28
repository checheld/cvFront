
function getSessionRoomId() {
    let jsonData = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv')
    return jsonData !== null ? JSON.parse(jsonData) : null
}

let config: any;

const token = getSessionRoomId();

if (token !== null) {
    config = {
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Access-Control-Allow-Origin': '*',
        }
    }
}
export default config;