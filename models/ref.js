const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refSchema = new Schema({
  title: { type: String, required: true },
  url: {type: String, required: true, unique: true},
  private: {type: Boolean, required: true, default: false},
  date: { type: Date, default: Date.now }
});

const Ref = mongoose.model("Ref", refSchema);

module.exports = Ref;
