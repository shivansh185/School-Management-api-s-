function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const toRad = value => value * Math.PI / 180;
    
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

function sortByProximity(schools, userLat, userLon) {
    return schools.map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);
}

module.exports = { sortByProximity };