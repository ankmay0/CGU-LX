const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(value) {
                return value.endsWith('@cgu-odisha.ac.in');
            },
            message: 'Email must end with @cgu-odisha.ac.in'
        }
    },
    password: { type: String, required: true },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('User', UserSchema);
