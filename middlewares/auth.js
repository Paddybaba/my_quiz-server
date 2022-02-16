const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["mcq-access-token"] ||
    req.cookies["mcq-access-token"];

  if (!token)
    return res.status(403).json("User not authenticated , goto login");

  try {
    const isValid = jwt.verify(token, process.env.SECRET_KEY_JWT);

    req.user = isValid;
    // req.authenticated = true;
    // return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json("Authentication error");
  }
  return next();
};

module.exports = verifyToken;
