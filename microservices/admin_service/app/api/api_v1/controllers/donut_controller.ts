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

    static async getDetailDonut(req: Request, res: Response) {

    }

    static async createDonut(req: Request, res: Response) {

    }

    static async updateDonut(req: Request, res: Response) {

    }

    static async deleteDonut(req: Request, res: Response) {

    }

    static async filterDonut(req: Request, res: Response) {

    }
}

