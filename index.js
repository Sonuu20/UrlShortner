import express from "express";
import { router as urlRoute } from "./routes/url.route.js";
import { connectToMongoDB } from "./connection.js";

const app = express();
const port = 8000;

app.use(express.json());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

//routes
app.use("/url", urlRoute);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
