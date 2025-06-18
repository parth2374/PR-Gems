const express = require("express");
const http = require("http");
const https = require("https");
const router = express.Router();
const url = require("url");

router.get("/download", (req, res) => {
  const fileUrl = req.query.url;
  const fileName = req.query.name || "file";

  if (!fileUrl) return res.status(400).send("Missing file URL");

  const parsedUrl = url.parse(fileUrl);
  const client = parsedUrl.protocol === "https:" ? https : http;

  client.get(fileUrl, (fileRes) => {
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", fileRes.headers["content-type"]);
    fileRes.pipe(res);
  }).on("error", (err) => {
    console.error(err);
    res.status(500).send("Download failed");
  });
});

module.exports = router;
