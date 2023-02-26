import express from "express";
import { signup, login, people, upload, edit } from "../controllers/user-controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/upload', upload);
router.post("/edit", edit);
router.get("/people", people);

export default router;
