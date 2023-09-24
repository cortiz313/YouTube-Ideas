import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Idea } from "./models/ideaModel.js";
import ideasRoute from "./routes/ideasRoute.js";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option 1: Allow All Origins with default of cors (*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET, POST, PUT, DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.post("/api/videos", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.views ||
      !req.body.likes ||
      !req.body.comments ||
      !req.body.uploadDate ||
      !req.body.moreViewsThanSubscribers ||
      !req.body.subscribers
    ) {
      return res.status(400).send({
        message: "Required fields are missing.",
      });
    }

    // Assuming you have a Video model and database set up
    const video = await Video.create({
      title: req.body.title,
      views: req.body.views,
      likes: req.body.likes,
      comments: req.body.comments,
      uploadDate: req.body.uploadDate,
      moreViewsThanSubscribers: req.body.moreViewsThanSubscribers,
      subscribers: req.body.subscribers,
    });

    return res.status(201).send(video);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for / without anything else for testing
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("The HTTP Route is working.");
});

app.get("/api/videos", (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "../ai_video_data.json");
    const videoData = JSON.parse(readFileSync(filePath));
    //const videoData = JSON.parse(readFileSync(filePath));
    //res.json(videoData);
    return res.status(200).json({
      count: videoData.length,
      data: videoData,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.use("/ideas", ideasRoute); // for every route called with ideas, use this router

// Connecting to MongoDB with Mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB connection is successful.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
