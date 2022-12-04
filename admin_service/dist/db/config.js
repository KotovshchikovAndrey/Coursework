"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Конфигурация базы данных
const databaseConfig = {
    type: "mysql" || process.env.DEV_DB_TYPE,
    host: process.env.DEV_DB_HOST || "localhost",
    port: Number(process.env.DEV_DB_PORT) || 5432,
    username: process.env.DEV_DB_USERNAME || "postgres",
    password: process.env.DEV_DB_PASSWORD || "postgres",
    database: process.env.DEV_DB_NAME || "postgres",
    synchronize: true,
};
exports.default = databaseConfig;
