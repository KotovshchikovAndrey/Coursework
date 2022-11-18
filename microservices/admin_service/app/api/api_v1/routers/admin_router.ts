import express from 'express'
import donutRouter from './donut_routers'
import ingredientRouter from './ingredient_router'

const adminRouter = express.Router()

adminRouter.use('/donut', donutRouter)
adminRouter.use('/ingredient', ingredientRouter)

export default adminRouter

