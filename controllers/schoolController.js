const School = require('../models/schoolModel');
const { sortByProximity } = require('../utils/distanceCalculator');
const { validateSchoolInput, validateCoordinates } = require('./validation');

const schoolController = {
    async addSchool(req, res) {
        try {
            const { name, address, latitude, longitude } = req.body;
            
            // Validate input
            const validation = validateSchoolInput({ name, address, latitude, longitude });
            if (!validation.isValid) {
                return res.status(400).json({ 
                    success: false, 
                    errors: validation.errors 
                });
            }
            
            // Create school
            const schoolId = await School.create({ name, address, latitude, longitude });
            
            res.status(201).json({ 
                success: true, 
                message: 'School added successfully',
                schoolId 
            });
        } catch (error) {
            console.error('Error adding school:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    },
    
    async listSchools(req, res) {
        try {
            const { latitude, longitude } = req.query;
            
            // Validate coordinates
            const validation = validateCoordinates(parseFloat(latitude), parseFloat(longitude));
            if (!validation.isValid) {
                return res.status(400).json({ 
                    success: false, 
                    errors: validation.errors 
                });
            }
            
            // Get all schools
            const schools = await School.findAll();
            
            // Sort by proximity
            const sortedSchools = sortByProximity(
                schools, 
                parseFloat(latitude), 
                parseFloat(longitude)
            );
            
            res.status(200).json({ 
                success: true, 
                data: sortedSchools 
            });
        } catch (error) {
            console.error('Error listing schools:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error' 
            });
        }
    }
};

module.exports = schoolController;