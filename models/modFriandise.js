const mongoose = require('mongoose');

const friandisesSchema = new mongoose.Schema({
    brand: String,
    price: String,
    compagnie: String,
    cat: String
});

module.exports = mongoose.model('friandise', friandisesSchema);