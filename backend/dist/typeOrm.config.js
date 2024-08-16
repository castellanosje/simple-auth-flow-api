"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const typeorm_1 = require("typeorm");
const user_schema_1 = require("./schema/user.schema");
exports.AppDataSource = new typeorm_1.DataSource({
    migrationsTableName: "migrations",
    type: "postgres",
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT),
    username: "postgres",
    password: "root",
    database: "typeormDB",
    synchronize: false,
    logging: true,
    entities: [user_schema_1.User],
    migrations: ["./migrations/*{.ts,.js}"],
    subscribers: ["./subscriber/**/*{.ts,.js}"],
});
