import express from 'express'
import donutRouter from './donut_routers'

const adminRouter = express.Router()

adminRouter.use('/donut', donutRouter)

export default adminRouter

