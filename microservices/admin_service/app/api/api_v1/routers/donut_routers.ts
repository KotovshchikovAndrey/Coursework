import express, { Request, Response, NextFunction } from 'express'
import DonutController from '../controllers/donut_controller'
import createDonutValidator from '../../middlewares/donut_middlewares'

const donutRouter = express.Router()

donutRouter
    .all(
        '/all',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('ListValidator').validate(req, res, next)
        },
        DonutController.getAllDonuts
    )
    .get(
        '/:id',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('DetailValidator').validate(req, res, next)
        },
        DonutController.getDetailDonut
    )
    .post(
        '/create',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('CreationValidator').validate(req, res, next)
        },
        DonutController.createDonut
    ).put(
        '/update:id',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('DetailValidator').validate(req, res, next)
        },
        DonutController.updateDonut
    )

export default donutRouter