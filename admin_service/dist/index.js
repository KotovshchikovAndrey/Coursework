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
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = __importDefault(require("./utils/exceptions/error_handler"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config({ path: config_1.default.envPath });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./db/database"));
const admin_router_1 = __importDefault(require("./api/api_v1/routers/admin_router"));
const fileUpload = require('express-fileupload');
const app = (0, express_1.default)();
app.use(fileUpload());
app.use(express_1.default.json());
// Маршрутизация
app.use('/media', express_1.default.static(config_1.default.defaultUploadDir));
app.use('/api/v1/admin', admin_router_1.default);
// Кастомный обработчик ошибок 
app.use(error_handler_1.default);
// Запускает сервер и подключается к базе данных
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Подключение к базе данных
        yield database_1.default.initialize();
        console.log('База данных подкючена');
        // Запуск сервера 
        app.listen(process.env.SERVER_PORT || 8000, () => {
            console.log('Сервер запущен');
        });
    }
    catch (error) {
        console.log(error);
    }
});
runServer();
