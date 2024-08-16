import { Router } from "express";

import {
	refreshToken,
	loginUser,
	registerUser,
	logOutUser,
} from "../controllers/auth.controllers";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/api/auth/register", registerUser);

router.post('/api/auth/login',loginUser);

router.post('/api/auth/refresh-token', refreshToken);

router.get("/api/auth/logout", requireAuth, logOutUser);

export default router;



