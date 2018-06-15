const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: String,
    password: String,
    addedAt: {type: Date, default: Date.now}
}, {
    versionKey: false,
    collection: 'users'
});

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew()) this.password = bcrypt.hashSync(this.password, 12);
    next();
});

module.exports = mongoose.model('userModel', userSchema);