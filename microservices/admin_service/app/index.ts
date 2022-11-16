import * as path from 'path'
import dotenv from 'dotenv'
import ApiErrorMiddleware from './utils/exceptions/errors_middleware'

dotenv.config({ path: path.join(__dirname, '..', 'app', '.env') })

import express from 'express'

import dataSourceConnection from './db/database'
import adminRouter from './api/api_v1/routers/admin_router'

const app = express()
app.use(express.json())

// Маршрутизация
app.use('/api/v1/admin', adminRouter)

// Кастомный обработчик ошибок 
app.use(ApiErrorMiddleware)

// Запускает сервер и подключается к базе данных
const runServer = async () => {
    try {
        // Подключение к базе данных
        await dataSourceConnection.initialize()
        console.log('База данных подкючена')

        // Запуск сервера 
        app.listen(process.env.SERVER_PORT || 8000, () => {
            console.log('Сервер запущен')
        })
    } catch (error) {
        console.log(error)
    }
}

runServer()