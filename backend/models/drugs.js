const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: {type: String, required: true},
    composition: {type: String, required: true},
    form: {type: String, required: true},
    category: {type: String, required: true},
    indication: {type: String, required: true},
    dose: {type: String, required: true},
    contraindication: {type: String, required: true},
    manufacturer: {type: Array, required: true},
    pregnancyCategory: {type: String, required: true},
    lactationSafety: {type: String, required: true}
});

module.exports = mongoose.model("drugs", drugSchema)