"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const user_schema_1 = require("../schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authConfig_1 = require("../authConfig");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, password, userName } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "you must provide valid credentials" });
        }
        const userExists = yield user_schema_1.User.findOneBy({ userName });
        if (userExists) {
            return res.status(403).json({ message: "user taken" });
        }
        const user = new user_schema_1.User();
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user.userName = userName;
        user.password = hashedPassword;
        user.firstName = firstName;
        user.lastName = lastName;
        yield user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const user = yield user_schema_1.User.findOneBy({ userName });
        if (!user) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        // generate Token
        const token = jsonwebtoken_1.default.sign(
					{ userId: user.id },
					authConfig_1.SECRET,
					{
						expiresIn: ACCESS_TOKEN_EXPIRES,
					}
				);
        return res.status(200).json({
            id: user.id,
            userName: user.userName,
            email: user.foo,
            firstName: user.firstName,
            lastName: user.lastName,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_schema_1.User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // tal vez sea mejor put ya que consultas repetitivas con los mismos datos crean nuevos eventos siempre
    // es decir no es indempotente
    try {
        const { id } = req.params;
        const updatedUser = yield user_schema_1.User.update({ id: parseInt(id) }, req.body);
        if (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.affected) {
            return res.status(200).json({ message: `${updatedUser.affected} records affected` });
        }
        else {
            return res.status(304);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
