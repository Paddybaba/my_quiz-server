const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json("User not authenticated , goto login");

  try {
    const isValid = jwt.verify(accessToken, process.env.SECRET_KEY_JWT);
    if (!isValid) {
      return res.status(400).json("not authenticated");
    } else {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { validateToken };
