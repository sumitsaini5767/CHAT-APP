const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//creating user Schema
const userSchema = mongoose.Schema(
  {
    name: { type: "string", required: true },
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    pic: {
      type: "string",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamp: true,
  }
);

//functon for match password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//for password encription by using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  //if object is modified then encrypting password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
