import express from "express";
import {
  handleGenerateNewShortUrl,
  handleGetShortUrl,
  hadleGetAnalytics,
} from "../controllers/url.controller.js";
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleGetShortUrl);

router.get("/analytics/:shortId", hadleGetAnalytics);

export { router };
