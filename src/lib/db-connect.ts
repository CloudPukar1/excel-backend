import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://cloudpukar:xp7yDwhRAG5OcWNB@cluster0.6xdss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected successfully");
  });
