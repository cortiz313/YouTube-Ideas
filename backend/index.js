import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Idea } from "./models/ideaModel.js";
import ideasRoute from "./routes/ideasRoute.js";

const app = express();

// Middlewarefor parsing request body
app.use(express.json());

// Route for / without anything else for testing
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("The HTTP Route is working.");
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
