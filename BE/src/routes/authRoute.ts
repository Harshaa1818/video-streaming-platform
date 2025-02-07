import express from "express";
import { Signup, SignIn, GetUser } from "../controller/auth.controller";
import jwtMiddleware from "../middleware/jwt.middleware";

const Authrouter = express.Router();

Authrouter.post("/signup", Signup);
Authrouter.post("/login", SignIn);
Authrouter.get("/me", jwtMiddleware, GetUser);

export default Authrouter;
