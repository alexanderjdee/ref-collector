const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  refs: [
    {
    type: Schema.Types.ObjectId,
    ref: "Book"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;