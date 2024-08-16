import { Router } from "express";
import {
	getUsers,
	updateUser,
} from "../controllers/user.controllers";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.get("/api/users", requireAuth, getUsers);

router.patch("/api/update-user/:id", requireAuth, updateUser);


export default router;



