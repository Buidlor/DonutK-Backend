const { model, Schema } = require('mongoose');

const OrderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' ,
        required: true,
    },
    donuts:[
        {
            product: { 
                type: Schema.Types.ObjectId,
                ref: 'Donut',
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
});
module.exports = model('Order', OrderSchema);
