import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is required " });

  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistroy: [],
    createdBy: req.user._id
  });

  return res.render("home", {
    id: shortID,
  });
};

async function handleGetShortUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

async function hadleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export { handleGenerateNewShortUrl, handleGetShortUrl, hadleGetAnalytics };
