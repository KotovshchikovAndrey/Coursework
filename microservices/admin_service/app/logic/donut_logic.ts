import { Repository } from 'typeorm'
import { Donut } from '../db/interfaces'


export default class DonutService {
    private donutRepository: Repository<Donut>

    constructor(donutRepository: Repository<Donut>) {
        this.donutRepository = donutRepository
    }

    async getAllDonuts() {
        return await this.donutRepository.find()
    }

    async getDetailDonut(donutId: number) {
        const donut = await this.donutRepository.findOneBy({id: donutId})
        return donut
    }
}
