import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import URL from "./models/url.model.js";
import { router as urlRoute } from "./routes/url.route.js";
import { router as staticRoute } from "./routes/staticRouter.route.js";
import { router as userRoute } from "./routes/user.route.js";
import { connectToMongoDB } from "./connection.js";
import { restrictToLoggedinUserOnly, checkAuth } from "./middlewares/auth.middleware.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/",checkAuth, staticRoute);

// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});
//     return res.render('home', {
//       urls: allUrls,
//     });
// })

app.listen(port, () => console.log(`Server is running on port: ${port}`));
