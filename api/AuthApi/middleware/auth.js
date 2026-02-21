import jwt from "jsonwebtoken";

function auth (req, res, next) {
  const authHeader = req.headers.authorization  || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json(responseGenerator.generate({isSuccess: false, message: 'Missing or invalid Authorization header'}));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {id: decoded.id, email: decoded.email};
    next();
  } catch(err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json(responseGenerator.generate({message: "Access token expired"}));
    }
     
    return res.status(401).json(responseGenerator.generate({message:"Invalid token"}));
  }
}

export default auth;