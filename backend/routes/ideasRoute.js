import express from "express";
import { Idea } from "../models/ideaModel.js";

const router = express.Router();

// Route to save a new idea
// POST to create a new idea
// TODO: Connect this to the YouTube process or ChatGPT process
// Mongoose is async, so can use it
// with router, instead of app.post,get,etc. we use router
router.post("/", async (request, response) => {
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
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
  // colon : means its a  parameter in the route
  try {
    const { id } = request.params;

    const idea = await Idea.findById(id);

    if (!idea) {
      return response.status(404).json({ message: "Idea not found" });
    }

    return response.status(200).json(idea);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update the idea
// use PUT to update the idea
router.put("/:id", async (request, response) => {
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

    const { id } = request.params;
    const result = await Idea.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Idea not found" });
    }

    return response.status(200).json({ message: "Idea updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete the idea
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Idea.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Idea not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
