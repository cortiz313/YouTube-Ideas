import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Idea } from "./models/ideaModel.js";

const app = express();

// Middlewarefor parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack tutorial");
});

// Route to save a new idea
// POST to create a new idea
// TODO: Connect this to the YouTube process or ChatGPT process
// Mongoose is async, so can use it
app.post("/idea", async (request, response) => {
  try {
    if (
      !request.body.idea ||
      !request.body.viewsMedian ||
      !request.body.likesMedian ||
      !request.body.commentsMedian
    ) {
      return response.status(400).send({
        message:
          "Required fields are missing: Idea, View Median, Like Median, Comment Median",
      });
    }
    const newIdea = {
      idea: request.body.idea,
      viewsMedian: request.body.viewsMedian,
      likesMedian: request.body.likesMedian,
      commentsMedian: request.body.commentsMedian,
    };

    const idea = await Idea.create(newIdea);

    return response.status(201).send(idea);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all ideas from database
app.get("/ideas", async (request, response) => {
  try {
    const ideas = await Idea.find({});
    return response.status(200).json({
      count: ideas.length,
      data: ideas,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one idea from database by id
app.get("/ideas/:id", async (request, response) => {
  // colon : means its a  parameter in the route
  try {
    const { id } = request.params;

    const idea = await Idea.findById(id);

    return response.status(200).json(idea);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update the idea
// use PUT to update the idea
// app.put();

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
