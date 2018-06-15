const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const unitSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    unit: String
}, {
    versionKey: false,
    collection: 'units'
});

module.exports = mongoose.model('unitModel', unitSchema);

