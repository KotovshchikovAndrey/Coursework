import { In, Repository } from 'typeorm'
import { Donut, Ingredient } from '../db/interfaces'
import { CreateDonutDto, RemoveDonutIngredientDto, UpdateDonutDto } from '../dto/donut_dto'
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
            await this.setIngregientsForDonut(newDonut, ingredientsNames)
        }

        await this.donutRepository.save(newDonut)
    }

    async partialUpdateDonut(donutId: string, updateDonutData: UpdateDonutDto) {
        const donutInstanceForUpdate = await this.donutRepository.findOne({ where: { id: parseInt(donutId) } })
        if (donutInstanceForUpdate === null) {
            throw ApiError.notFound('Запись не найдена!')
        }

        if (typeof updateDonutData.ingredientsNames !== 'undefined') {
            await this.setIngregientsForDonut(donutInstanceForUpdate, updateDonutData.ingredientsNames)
        }

        const allowedUpdateFields = ['name', 'description', 'price']
        for (const field in updateDonutData) {
            if (!allowedUpdateFields.includes(field)) {
                delete updateDonutData[field as keyof UpdateDonutDto]
            }
        }

        this.donutRepository.merge(donutInstanceForUpdate, updateDonutData)
        const updatedDonut = await this.donutRepository.save(donutInstanceForUpdate)

        return updatedDonut
    }

    async deleteDonut(donutId: string) {
        await this.donutRepository.delete({
            id: parseInt(donutId)
        })
    }

    async deleteIngredient(donutId: string, removeDonutIngredientData: RemoveDonutIngredientDto) {
        const { ingredientsNames } = removeDonutIngredientData
        if (!ingredientsNames) {
            return
        }

        const donutInstance = await this.donutRepository.findOne(
            {
                where: { id: parseInt(donutId) },
                relations: { ingredients: true }
            }
        )
        if (donutInstance === null) {
            throw ApiError.notFound('Запись не найдена!')
        }

        donutInstance.ingredients = donutInstance.ingredients.filter((ingredient) => {
            return !ingredientsNames.includes(ingredient.name)
        })

        await this.donutRepository.save(donutInstance)
    }

    private async setIngregientsForDonut(donutInstance: Donut, ingredientsNames: string[]) {
        const ingredientService = new IngredientService(ingredientSqlRepository)
        const ingredients = await ingredientService.findIngredientsByName(ingredientsNames)
        donutInstance.ingredients = ingredients
    }
}
