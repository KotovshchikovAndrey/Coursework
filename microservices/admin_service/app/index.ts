import * as path from 'path'
import dotenv from 'dotenv'
import ApiErrorHandler from './utils/exceptions/error_handler'
import serviceConfig from './config'

dotenv.config({ path: serviceConfig.envPath })

import express from 'express'

import dataSourceConnection from './db/database'
import adminRouter from './api/api_v1/routers/admin_router'

const fileUpload = require('express-fileupload')

const app = express()
app.use(fileUpload())
app.use(express.json())

// Маршрутизация
app.use('/media', express.static(serviceConfig.defaultUploadDir))
app.use('/api/v1/admin', adminRouter)

// Кастомный обработчик ошибок 
app.use(ApiErrorHandler)

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