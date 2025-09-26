export default (lat1Deg: number,
     lon1Deg: number,
     lat2Deg: number,
     lon2Deg: number) => {
        console.log({lon1Deg, lat1Deg, lon2Deg, lat2Deg})
    function toRad(degree: number) {
        return degree * Math.PI / 180;
    }
    const lat1 = toRad(lat1Deg);
    const lon1 = toRad(lon1Deg);
    const lat2 = toRad(lat2Deg);
    const lon2 = toRad(lon2Deg);
    
    const { sin, cos, sqrt, atan2 } = Math;
    
    const R = 6371008.7714; // earth radius in m
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = sin(dLat / 2) * sin(dLat / 2)
            + cos(lat1) * cos(lat2)
            * sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a)); 
    const d = R * c;
    console.log(d)
    return d; // distance in m
}