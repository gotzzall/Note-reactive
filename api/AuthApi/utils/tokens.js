import "dotenv/config";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import jwtRepository from "../repository/jwtRepository.js";
import path from "path";

const ACCESS_TTL = "15m";
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createJti() {
  return crypto.randomBytes(16).toString("hex");
}

export function signAccessToken(user) {
  const payload = { id: user.id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(user, jti) {
  const payload = { id: user.id.toString(), jti };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TTL_SEC,
  });
  return token;
}

export async function persistRefreshToken({
  user,
  refreshToken,
  jti,
  ip,
  userAgent,
}) {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);
  await jwtRepository.addJwt({
    user: user.id,
    tokenHash,
    jti,
    expiresAt,
    ip,
    userAgent,
  });
}

export function setRefreshCookie(res, refreshToken) {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    path: "/api/auth/refresh",
    maxAge: REFRESH_TTL_SEC * 1000,
    sameSite: "none",
    secure: false,
  });
}

export async function rotateRefreshToken(oldDoc, user, req, res) {
  oldDoc.revokedAt = new Date().toISOString();
  const newJti = createJti();
  oldDoc.replacedBy = newJti;

  await jwtRepository.updateJwt(oldDoc);

  const newAccess = signAccessToken(user);
  const newRefresh = signRefreshToken(user, newJti);
  await persistRefreshToken({
    user,
    refreshToken: newRefresh,
    jti: newJti,
    ip: req.ip,
    userAgent: req.header["user-agent"] || "",
  });

  setRefreshCookie(res, newRefresh);
  return { accessToken: newAccess, refreshToken: newRefresh };
}
