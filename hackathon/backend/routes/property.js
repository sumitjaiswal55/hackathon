const express = require('express');
const router = express.Router();
const Property = require('../models/PropertySchema'); // Schema path check kar lena

// 1. Add Property (Owner side)
// Endpoint: POST http://localhost:3000/api/properties/add
router.post('/add', async (req, res) => {
    try {
        const { owner, title, rent, location, amenities, roomType } = req.body;
        const newProperty = new Property({
            owner, // User _id (Owner)
            title,
            rent,
            location, // { lat: Number, lng: Number }
            amenities,
            roomType
        });
        const savedProperty = await newProperty.save();
        res.status(201).json({ success: true, data: savedProperty });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Search Properties (Distance Based)
// Endpoint: GET http://localhost:3000/api/properties/search?lat=21.14&lng=79.08&maxRent=15000
router.get('/search', async (req, res) => {
    try {
        const { lat, lng, maxDist = 5, maxRent } = req.query;

        let query = {};
        if (maxRent) query.rent = { $lte: maxRent };

        const properties = await Property.find(query);

        // Simple Haversine or Euclidean filter for distances
        const filtered = properties.filter(p => {
            const d = Math.sqrt(
                Math.pow(p.location.lat - lat, 2) + 
                Math.pow(p.location.lng - lng, 2)
            ) * 111; // 1 degree ~ 111km
            return d <= parseFloat(maxDist);
        });

        res.json({ success: true, count: filtered.length, data: filtered });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;