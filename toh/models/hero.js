
// models/Hero.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    },
    fight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Villan"
      }
    ],
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);