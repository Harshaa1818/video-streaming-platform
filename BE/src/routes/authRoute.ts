import express from "express";
import { Signup } from "../controller/auth.controller";

const Authrouter = express.Router();

Authrouter.post("/signup", Signup);

export default Authrouter;
