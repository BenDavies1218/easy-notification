const bcrypt = require("bcryptjs");

/*
- username
- password
- 
*/

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  viewHistory: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  // comments: {
  // 	// These are NOT the same comments as what the Blogs contain, they just reuse the comment schema
  // 	types: [commentSchema],
  // 	required: false
  // }
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre-save hook running");

  if (!user.isModified("password")) {
    return next();
  }

  console.log(this.password);

  // TODO: encryption
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  console.log(hash);

  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
