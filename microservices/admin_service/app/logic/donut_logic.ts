import { Repository } from 'typeorm'
import { Donut } from '../db/interfaces'
import { createDonutDto } from '../dto/donut_dto'
import ApiError from '../utils/exceptions/api_errors'

const pageLimit = 2


export default class DonutService {
    private donutRepository: Repository<Donut>

    constructor(donutRepository: Repository<Donut>) {
        this.donutRepository = donutRepository
    }

    async getAllDonuts(pageNumber: string) {
        const offset = parseInt(pageNumber) * pageLimit - pageLimit
        const donutsList = await this.donutRepository.find({ take: pageLimit, skip: offset })

        return donutsList
    }

    async getPageCounts() {
        const donutCounts = await this.donutRepository.count()
        const pageCounts = Math.ceil(donutCounts / pageLimit)

        return pageCounts
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
