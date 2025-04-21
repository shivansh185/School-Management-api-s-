function validateSchoolInput({ name, address, latitude, longitude }) {
    const errors = [];
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }
    
    if (!address || typeof address !== 'string' || address.trim().length === 0) {
        errors.push('Address is required and must be a non-empty string');
    }
    
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        errors.push('Latitude must be a valid number between -90 and 90');
    }
    
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        errors.push('Longitude must be a valid number between -180 and 180');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

function validateCoordinates(latitude, longitude) {
    const errors = [];
    
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        errors.push('Latitude must be a valid number between -90 and 90');
    }
    
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        errors.push('Longitude must be a valid number between -180 and 180');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

module.exports = { validateSchoolInput, validateCoordinates };