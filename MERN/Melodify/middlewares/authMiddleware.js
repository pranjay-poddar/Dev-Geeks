const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};
