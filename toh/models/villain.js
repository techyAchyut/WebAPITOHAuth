
// models.Villain.js
const mongoose = require("mongoose");

const villainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    fight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hero"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Villain", villainSchema);
