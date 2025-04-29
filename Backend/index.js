import express from "express";
import mongoose from 'mongoose';
import { PORT } from "./config.js";
import BooksRoute from './routes/BooksRoute.js';
import AuthRoute from "./routes/AuthRoute.js";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Set up CORS with specific options
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/auth", AuthRoute);
app.use("/books", BooksRoute);

// Check for required environment variables
const mongoUrl = process.env.MONGOURL;
if (!mongoUrl) {
  console.error("MONGOURL environment variable is not defined. Please check your .env file.");
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT || 4000, () => {
      console.log(`App is listening on port: ${PORT || 6000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });