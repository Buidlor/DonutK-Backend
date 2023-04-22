const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    guest: { type: Boolean, default: false }
});

module.exports = model('User', UserSchema);