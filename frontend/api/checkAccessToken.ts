export default function isAccessTokenExpired(token: string) {
    console.log({ 'access_token from checkAccessToken.js': token })
    try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);

        // `exp` is in seconds, Date.now() is in ms
        const expiryTime = payload.exp * 1000;
        console.log('Mins left =>', (expiryTime - Date.now()) / 60000)
        return (expiryTime - Date.now()) / 60000;
    } catch (e) {
        console.error('Invalid token format', e);
        return 0; // treat as expired if can't decode
    }
}