const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    article: Number,
    article1s: String,
    name: String,
    barcode: Number,
    //unit: {type: Schema.Types.ObjectId, ref: 'unitModel'}
    unit: String
}, {
    versionKey: false,
    collection: 'products'
});

module.exports = mongoose.model('prodModel', prodSchema);