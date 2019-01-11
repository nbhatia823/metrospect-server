const mongoose = require("mongoose");

const { Schema } = mongoose;

const ArticleSchema = new Schema(
  {
    title: String,
    author: String,
    keywords: [String],
    module_types: [String],
    module_contents: [String]
  },
  { timestamps: true }
);

ArticleSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    author: this.author,
    keywords: [String],
    module_types: this.module_types,
    module_contents: this.module_contents,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Article", ArticleSchema);
