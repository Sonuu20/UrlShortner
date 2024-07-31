import express from "express";
import URL from "../models/url.model.js";
import { restirctTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admin/urls", restirctTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/", restirctTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export { router };
