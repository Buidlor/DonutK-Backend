const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    guest: { type: Boolean, default: false },
    address: { 
        street: { type: String, required: false },
        houseNumber: { type: String, required: false },
        city: { type: String, required: false },
        postalCode: { type: String, required: false },
    },
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = model('User', UserSchema);