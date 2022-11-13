import { Request, Response } from 'express'
import { donutSqlRepository } from '../../../db/repositories'
import DonutService from '../../../logic/donut_logic'


export default class DonutController {
    static async getAllDonuts(req: Request, res: Response) {
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

