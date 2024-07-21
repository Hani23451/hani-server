const mongoose = require("mongoose");

const Stories = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    jewelCount: {
      type: Number,
  
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Stories", Stories);
