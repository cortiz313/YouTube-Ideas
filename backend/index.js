import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Idea } from "./models/ideaModel.js";
import ideasRoute from "./routes/ideasRoute.js";
import cors from "cors";

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
