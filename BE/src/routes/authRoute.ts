import express from "express";
import { Signup, SignIn, GetUser } from "../controller/auth.controller";
import AuthMiddleware from "../middleware/Auth.middleware";

const Authrouter = express.Router();

Authrouter.post("/signup", Signup);
Authrouter.post("/login", SignIn);
Authrouter.get("/me", AuthMiddleware, GetUser);

export default Authrouter;
