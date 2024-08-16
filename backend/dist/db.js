"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_schema_1 = require("./schema/user.schema");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "typeormDB",
    synchronize: true,
    logging: true,
    entities: [user_schema_1.User],
    subscribers: [],
    migrations: [],
});
