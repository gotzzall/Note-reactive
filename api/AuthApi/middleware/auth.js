import jwt from "jsonwebtoken";
import responseGenerator from "../tools/responseGenerator.js";

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, tokenFromHeader] = authHeader.split(" ");
  const tokenFromCookie = req.cookies?.access_token;

  const token =
    scheme === "Bearer" && tokenFromHeader ? tokenFromHeader : tokenFromCookie;

  if (!token) {
    return res.status(401).json(
      responseGenerator.generate({
        isSuccess: false,
        message: "No token provided",
      }),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(responseGenerator.generate({ message: "Access token expired" }));
    }

    return res
      .status(401)
      .json(responseGenerator.generate({ message: "Invalid token" }));
  }
}

export default auth;
