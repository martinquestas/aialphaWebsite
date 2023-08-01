const express = require("express");
const { join } = require("path");
const app = express();
const port = process.env.PORT || 3000;
// Serve static assets from the /public folder
app.use(express.static("public"));
app.use("/static", express.static("static"));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/profiledashboard.html", (req, res) => {
  res.sendFile(join(__dirname, "profiledashboard.html"));
});

app.listen(port, () => console.log(`Application running on port ${port}`));
