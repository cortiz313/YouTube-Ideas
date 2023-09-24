import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
    comments: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    moreViewsThanSubscribers: { type: Boolean, required: true },
    subscribers: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
