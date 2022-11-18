import { Repository } from 'typeorm'
import { Donut } from '../db/interfaces'
import { CreateDonutDto, UpdateDonutDto } from '../dto/donut_dto'
import ApiError from '../utils/exceptions/api_errors'
import { ingredientSqlRepository } from '../db/repositories'
import IngredientService from './ingredient_logic'

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

    async getPageCount() {
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

    async createDonut(newDonutData: CreateDonutDto) {
        const { name, description, price, ingredientsNames } = newDonutData
        const newDonut = this.donutRepository.create({
            name: name,
            description: description,
            price: price
        })

        if (typeof ingredientsNames !== 'undefined') {
            const ingredientService = new IngredientService(ingredientSqlRepository)
            const ingredients = await ingredientService.findIngredientsByName(ingredientsNames)
            newDonut.ingredients = ingredients
        }

        await this.donutRepository.save(newDonut)
    }

    async partialUpdateDonut(donutId: string, updateDonutData: UpdateDonutDto) {
        const donutForUpdate = await this.donutRepository.findOne({ where: { id: parseInt(donutId) } })
        if (donutForUpdate === null) {
            throw ApiError.notFound('Запись не найдена!')
        }

        const dataForUpdate = new Map<string, unknown>()
        Object.keys(updateDonutData).forEach((field) => {
            const valueForUpdate = updateDonutData[field as keyof UpdateDonutDto]
            if (typeof valueForUpdate !== 'undefined' && field !== 'ingredientsNames')
                dataForUpdate.set(field, valueForUpdate)
        })

        const updatedDonut = this.donutRepository.merge(donutForUpdate, dataForUpdate as UpdateDonutDto)
        if (typeof updateDonutData.ingredientsNames !== 'undefined') {
            const ingredientService = new IngredientService(ingredientSqlRepository)
            const ingredients = await ingredientService.findIngredientsByName(updateDonutData.ingredientsNames)
            updatedDonut.ingredients = ingredients
        }

        return await this.donutRepository.save(donutForUpdate)
    }
}
