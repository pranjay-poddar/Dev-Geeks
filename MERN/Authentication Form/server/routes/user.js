import express from "express"
import { registerUser, authUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);

export default router;