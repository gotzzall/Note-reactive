import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRespository from "../repository/userRepository.js";
import jwtGenerator from "../tools/jwtGenerator.js";
import {
  createJti,
  signAccessToken,
  signRefreshToken,
  persistRefreshToken,
  setRefreshCookie,
  hashToken,
  rotateRefreshToken,
} from "../utils/tokens.js";
import jwtRepository from "../repository/jwtRepository.js";

import responseGenerator from "../tools/responseGenerator.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userRespository.getOneUserByEmail({ email });
    console.log(existingUser);
    if (existingUser)
      return res
        .status(400)
        .json({ isSuccess: false, message: "User already exist", result: "" });

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRespository.addUser({
      id: crypto.randomUUID(),
      username,
      email,
      password: hasedPassword,
    });

    if (!newUser.lastInsertRowid)
      return res.status(400).json({
        isSuccess: false,
        message: "The user can not be registered",
        result: "",
      });

    return res.json(
      responseGenerator.generate({
        isSuccess: true,
        message: "User created successfully",
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRespository.getOneUserByEmail({ email });
    if (!user)
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid credentials1",
        result: "",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials", result: "" });

    const accessToken = signAccessToken(user);

    const jti = createJti();

    const refreshToken = signRefreshToken(user, jti);

    await persistRefreshToken({
      user,
      refreshToken,
      jti,
      ip: req.ip,
      userAgent: req.headers["user-agent"] || "",
    });

    setRefreshCookie(res, refreshToken);

    return res.json(
      responseGenerator.generate({
        isSuccess: true,
        result: accessToken,
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    const tokenHash = hashToken(token);
    const refreshTokenFinded = await jwtRepository.findOneJwt({
      tokenHash,
      jti: decoded.jti,
    });

    const tokensUser = await userRespository.getOneUserById({
      id: refreshTokenFinded.userId,
    });

    const doc = {
      user: {
        id: tokensUser.id,
        username: tokensUser.username,
        email: tokensUser.email,
      },
      tokenHash: refreshTokenFinded.tokenHash,
      jti: refreshTokenFinded.jti,
      expiresAt: refreshTokenFinded.expiresAt,
      revokedAt: refreshTokenFinded.revokedAt,
      replacedBy: refreshTokenFinded.replaceBy,
      createAt: refreshTokenFinded.createAt,
      ip: refreshTokenFinded.ip,
      userAgent: refreshTokenFinded.userAgent,
    };

    if (!doc) {
      return res.status(401).json({ message: "Refresh token not recognized" });
    }
    if (doc.revokedAt) {
      return res.status(401).json({ message: "Refresh token revoked" });
    }
    if (doc.expiresAt < new Date()) {
      return res.status(401).json({ message: "Refresh token expired" });
    }

    const result = await rotateRefreshToken(doc, doc.user, req, res);
    return res.json(
      responseGenerator.generate({
        isSuccess: true,
        result: result.accessToken,
      }),
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default authRouter;
