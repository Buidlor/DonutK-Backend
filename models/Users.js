const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    guest: { type: Boolean, default: false },
    address: { 
        street: { type: String, required: true },
        houseNumber: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
});

module.exports = model('User', UserSchema);