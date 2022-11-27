import express, { Request, Response, NextFunction } from 'express'
import DonutController from '../controllers/donut_controller'
import createDonutValidator from '../../middlewares/donut_middlewares'

const donutRouter = express.Router()

donutRouter
    .all(
        '/full',
        DonutController.getFullDonutsList
    )
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
        '/',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('CreationValidator').validate(req, res, next)
        },
        DonutController.createDonut
    )
    .patch(
        '/:id',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('UpdateValidator').validate(req, res, next)
        },
        DonutController.updateDonut
    )
    .delete(
        '/:id',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('DetailValidator').validate(req, res, next)
        },
        DonutController.deleteDonut
    )
    .delete(
        '/ingredients.remove/:id',
        (req: Request, res: Response, next: NextFunction) => {
            createDonutValidator('DetailValidator').validate(req, res, next)
        },
        DonutController.deleteIngredients
    )

export default donutRouter