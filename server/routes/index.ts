import express from "express";
import { signup, login, people } from "../controllers/user-controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/people", people);

export default router;
