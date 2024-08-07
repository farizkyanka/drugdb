const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  composition: { type: String, required: true },
  strength: { type: Array, required: true },
  form: { type: String, required: true },
  category: { type: String, required: true },
  class: { type: String, required: true },
  fornasRegistered: { type: Array },
  indication: { type: String, required: true },
  dose: { type: String, required: true },
  contraindication: { type: String, required: true },
  manufacturer: { type: Array, required: true },
  pregnancyCategory: { type: String, required: true },
  lactationSafety: { type: String, required: true },
  interactions: { type: Array, required: false },
  adverseEffects: { type: String, required: true },
  references: { type: Array },
  lastUpdated: { type: Date, required: true },
});

module.exports = mongoose.model("drugs", drugSchema);
