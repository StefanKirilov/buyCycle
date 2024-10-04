const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

userSchema.pre ('save',async function(next) {
    // this.password = await bcrypt.hash(this.password, 12);
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = userSchema;
module.exports = User;