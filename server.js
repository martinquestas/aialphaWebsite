const express = require("express");
const { join } = require("path");
const axios = require("axios");
require("dotenv").config();
const clientSecret = process.env.CLIENT_SECRET;
const { ManagementClient } = require("auth0");
const fs = require("fs");

// Read auth0 configuration and parse to JSON
const auth0config = JSON.parse(fs.readFileSync("auth_config.json"));

// Create ManagementClient with config
const auth0 = new ManagementClient({
  domain: auth0config.domain,
  clientId: auth0config.clientId,
  clientSecret: process.env.CLIENT_SECRET,
  scope: "read:users update:users",
});

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

app.listen(port, () => console.log(`Application running on port ${port}`));

app.post("/api/change-password", express.json(), async (req, res) => {
  try {
    await axios.post(
      `https://${auth0config.domain}/dbconnections/change_password`,
      {
        client_id: auth0config.clientId,
        email: req.body.email,
        connection: process.env.AUTH0_CONNECTION_NAME,
      }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
