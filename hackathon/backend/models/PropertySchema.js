const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    rent: { type: Number, required: true },
    address: String,
    location: {
        lat: Number,
        lng: Number
    },
    amenities: [String], 
    roomType: { type: String, enum: ['Single', 'Shared', '1BHK', 'Full House'] },
    isVerified: { type: Boolean, default: false },
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);