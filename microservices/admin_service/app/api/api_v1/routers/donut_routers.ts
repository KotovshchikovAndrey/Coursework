import express, { Request, Response, NextFunction } from 'express'
import DonutController from '../controllers/donut_controller'
import createDonutValidator from '../../middlewares/donut_middlewares'

const donutRouter = express.Router()

donutRouter
    .all('/all', DonutController.getAllDonuts)
    .get(
        '/:id',
        (req: Request, res: Response, next: NextFunction) => {
            const donutValidator = createDonutValidator('DetailValidator')
            donutValidator.validate(req, res, next)
        },
        DonutController.getDetailDonut
    )
    .post(
        '/create',
        (req: Request, res: Response, next: NextFunction) => {
            const donutValidator = createDonutValidator('CreationValidator')
            donutValidator.validate(req, res, next)
        },
        DonutController.createDonut
    )

export default donutRouter