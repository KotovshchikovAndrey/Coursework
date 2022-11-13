import express from 'express'
import DonutController from '../controllers/donut_controller'

const donutRouter = express.Router()

donutRouter.get('/all', DonutController.getAllDonuts)

export default donutRouter