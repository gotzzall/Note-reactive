import "dotenv/config";
import express, { json } from "express";
import authRouter from "./routes/auth.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import profilesRouter from "./routes/profiles.js";
import cookieParser from "cookie-parser";
import notesRouter from "./routes/notes.js";
import cors from "cors";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const app = express();

app.use(cookieParser());

const specs = swaggerJSDoc(options);

<<<<<<< HEAD
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

=======
app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

>>>>>>> 1ea59784bee3f651208725f0652dfc002446070e
app.use("/api/auth", authRouter);

app.use("/api/profile", profilesRouter);

<<<<<<< HEAD
=======
app.use("/api", notesRouter);

app.get("/", (req, res) => {
  return res.send("hello");
});

>>>>>>> 1ea59784bee3f651208725f0652dfc002446070e
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`Swagger en http://localhost:${PORT}/api-docs`);
});
