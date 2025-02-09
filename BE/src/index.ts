import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/authRoute";
import meetingRouter from "./routes/meetingRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import userRouter from "./routes/userRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zoom Backend API Documentation",
      version: "1.0.0",
      description: "API documentation for authentication and meetings",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/auth", AuthRouter);
app.use("/api/users", userRouter);
app.use("/api/meeting", meetingRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Swagger docs available at http://localhost:3000/api-docs");
});
