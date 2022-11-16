import { Request, Response, NextFunction } from 'express'
import ApiError from '../../../utils/exceptions/api_errors'
import { donutSqlRepository } from '../../../db/repositories'
import DonutService from '../../../logic/donut_logic'


export default class DonutController {
    static async getAllDonuts(req: Request, res: Response, next: NextFunction) {
        const donutService = new DonutService(donutSqlRepository)
        const donutsList = await donutService.getAllDonuts()

        return res.json(donutsList)
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

    static async updateDonut(req: Request, res: Response) {

    }

    static async deleteDonut(req: Request, res: Response) {

    }

    static async filterDonuts(req: Request, res: Response) {

    }
}

