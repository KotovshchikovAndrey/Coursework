import { Request, Response, NextFunction } from 'express'
import { donutSqlRepository } from '../../../db/repositories'
import DonutService from '../../../logic/donut_logic'
import ApiError from '../../../utils/exceptions/api_errors'


export default class DonutController {
    static async getFullDonutsList(req: Request, res: Response) {
        const donutService = new DonutService(donutSqlRepository)
        const fullDonutsList = await donutService.getFullDonutsListFromDb()

        return res.status(200).json({
            donuts: fullDonutsList,
        })
    }

    static async getAllDonuts(req: Request, res: Response, next: NextFunction) {
        const donutService = new DonutService(donutSqlRepository)
        const donutsList = await donutService.getAllDonuts(req.query.page as string)
        const pageCount = await donutService.getPageCount()

        return res.status(200).json({
            donuts: donutsList,
            page_count: pageCount
        })
    }

    static async getDetailDonut(req: Request, res: Response, next: NextFunction) {
        const donutService = new DonutService(donutSqlRepository)
        try {
            const donut = await donutService.getDetailDonut(req.params.id)
            return res.status(200).json(donut)
        } catch (e) {
            next(e)
        }
    }

    static async createDonut(req: Request, res: Response) {
        const donutService = new DonutService(donutSqlRepository)
        await donutService.createDonut(req.body)

        return res.status(201).json({
            message: 'Пончик создан!'
        })
    }

    static async updateDonut(req: Request, res: Response, next: NextFunction) {
        const donutService = new DonutService(donutSqlRepository)
        try {
            const donut = await donutService.partialUpdateDonut(
                req.params.id,
                req.body
            )

            return res.status(200).json({
                message: 'Пончик Обновлен!',
                donut: donut
            })
        } catch (e) {
            return next(e)
        }
    }

    static async deleteDonut(req: Request, res: Response) {
        const donutService = new DonutService(donutSqlRepository)
        await donutService.deleteDonut(req.params.id)

        return res.status(200).json({
            message: 'Пончик удален!'
        })
    }

    static async deleteIngredients(req: Request, res: Response, next: NextFunction) {
        const donutService = new DonutService(donutSqlRepository)
        try {
            await donutService.deleteIngredients(req.params.id, req.body)
            return res.status(200).json({
                message: 'Ингредиент удален!'
            })
        } catch (e) {
            return next(e)
        }
    }
}

