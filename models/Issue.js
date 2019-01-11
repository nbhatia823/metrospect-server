const mongoose = require("mongoose");

const { Schema } = mongoose;

const IssueSchema = new Schema(
  {
    _id: Number,
    title: String,
    release_date: Date,
    articles: [String]
  },
  { timestamps: true }
);

IssueSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    release_date: this.issue_date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Issue", IssueSchema);
