import mongoose from "mongoose";

const ideaSchema = mongoose.Schema(
  {
    idea: { type: String, required: true },
    viewsAverage: { type: Number, required: true },
    likesAverage: { type: Number, required: true },
    commentsAverage: { type: Number, required: true },
  },
  { timestamps: true }
);

export const idea = mongoose.model("idea", ideaSchema);
