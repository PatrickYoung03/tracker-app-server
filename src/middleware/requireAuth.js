const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //auth = "Beaer ndcikcndjks"

  if (!authorization) {
    return res.status(401).send({ error: "You must log in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must log in" });
    }

    const { userId } = payload;

    const user = await User.findById(userId);

    req.user = user;
    next();
  });
};
