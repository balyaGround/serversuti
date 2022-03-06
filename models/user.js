const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requires: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: setPassword,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

userSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("user", userSchema);
