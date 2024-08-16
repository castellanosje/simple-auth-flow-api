"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = (0, express_1.Router)();
router.get("/users", requireAuth_1.default, user_controllers_1.getUsers);
router.patch("/update-user/:id", requireAuth_1.default, user_controllers_1.updateUser);
exports.default = router;
