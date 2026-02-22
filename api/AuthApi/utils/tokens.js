import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import jwtRepository from "../repository/jwtRepository.js";

const ACCESS_TTL = "15m";
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createJti() {
  return crypto.randomBytes(16).toString("hex");
}

function signAccessToken(user) {
  const payload = { id: user.id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET);
}
