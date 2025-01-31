const jwt = require("jsonwebtoken");
require("dotenv/config");

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res
      .sendStatus(401)
      .json({ success: false, message: "unauthorized" });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (error, response) => {
    if (error) {
        return res.sendStatus(403);
    }
    res.locals = response;
    next();
  }) 
}

module.exports = {auth : auth}
