import { Repository } from 'typeorm'
import { Donut } from '../db/interfaces'
import { createDonutDto } from '../dto/donut_dto'
import ApiError from '../utils/exceptions/api_errors'


export default class DonutService {
    private donutRepository: Repository<Donut>

    constructor(donutRepository: Repository<Donut>) {
        this.donutRepository = donutRepository
    }

    async getAllDonuts() {
        return await this.donutRepository.find()
    }

    async getDetailDonut(donutId: string) {
        const donut = await this.donutRepository.findOneBy({ id: parseInt(donutId) })
        if (donut === null) {
            throw ApiError.notFound('Запись не найдена!')
        }

        return donut
    }

    async createDonut(newDonutData: createDonutDto) {
        const newDonut = this.donutRepository.create(newDonutData)
        await this.donutRepository.save(newDonut)
    }
}
