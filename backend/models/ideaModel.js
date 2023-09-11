import mongoose from "mongoose";

const ideaSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    viewsMedian: { type: Number, required: true },
    likesMedian: { type: Number, required: true },
    commentsMedian: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Idea = mongoose.model("Idea", ideaSchema);
