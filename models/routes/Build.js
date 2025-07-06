const mongoose = require('mongoose');

const BuildSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    components: [{
        component: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
        quantity: { type: Number, default: 1 }
    }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Build', BuildSchema);