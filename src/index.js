require("dotenv").config();
require("./models/user");
require("./models/track");
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const trackRouter = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middleware/requireAuth.js");

const app = express();

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRouter);

const mongoUri = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.5pn9m.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("error:", err);
});

const PORT = 3000;

app.get("/", requireAuth, (req, res) => {
  res.send(`user created with email: ${req.user.email}`);
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
