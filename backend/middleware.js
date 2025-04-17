const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(`Bearer `)) {
    return res.status(411).json({ msg: `You're not authorized` });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
  } catch {
    return res.status(400).json({ msg: `You're not authorized` });
  }
};

module.exports = { authMiddleware };
