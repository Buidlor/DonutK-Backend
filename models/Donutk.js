const { model, Schema } = require('mongoose');

const DonutSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: true },
    qty: { type: Number, default: 10 }, // quantity in stock
    date: { type: Date, default: Date.now },
    thumbsUp: { type: Number, default: 0 },
    thumbsDown: { type: Number, default: 0 },
});

module.exports = model('Donut', DonutSchema);