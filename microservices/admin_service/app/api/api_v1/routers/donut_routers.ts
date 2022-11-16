import express, { Request, Response, NextFunction } from 'express'
import DonutController from '../controllers/donut_controller'
import addValidator from '../../middlewares/donut_middlewares'

const donutRouter = express.Router()

donutRouter
    .get('/all', DonutController.getAllDonuts)
    .post(
        '/create',
        (req: Request, res: Response, next: NextFunction) => {
            const validator = addValidator('RequestValidator')
            validator.validate(req, res, next)
        },
        DonutController.createDonut
    )

export default donutRouter