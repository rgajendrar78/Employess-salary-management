import jwt from "jsonwebtoken";
const verifyUser = (req, res, next) => {
  const  {authorization}  = req.headers;
  if (!authorization)
    return res
      .status(401)
      .json({ success: false, message: "token is required" });
  try {
    req.user = jwt.verify(authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default verifyUser;
