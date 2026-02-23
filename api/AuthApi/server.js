import "dotenv/config";
import express, { json } from "express";
import authRouter from "./routes/auth.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import profilesRouter from "./routes/profiles.js";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notes.js";
import cors from "cors";

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);

app.use("/api/profile", profilesRouter);

app.use("/api", notesRouter);

app.get("/", (req, res) => {
  return res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
