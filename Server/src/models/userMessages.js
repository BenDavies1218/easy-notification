/**
- Title
- Content
- User to send to  
- Audit history
	- user 
	- timestamp 
*/

const mongoose = require("mongoose");
const { commentSchema } = require("./CommentSchema.js");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: {
      // post category defined by website admin/developer
      type: [String], // ["life", "travel", "photography"]
      enum: ["life", "travel", "photography", "coding"],
      required: true,
    },
    editHistory: {
      type: [{ user: String, timestamp: Date }],
      required: false,
    },
    // This is what we would write if we do NOT use subdocuments:
    // commentsAsObj: {
    // 	type: [{userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, content: {type: String}}],
    // 	required: false
    // },
    // This is what we would write if we DO use subdocuments:
    comments: {
      type: [commentSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  BlogModel,
};
