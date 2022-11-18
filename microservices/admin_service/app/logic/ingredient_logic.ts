import { Repository, In } from 'typeorm'
import { Ingredient } from '../db/interfaces'
import { createIngredientDto } from '../dto/ingredient_dto'
import ApiError from '../utils/exceptions/api_errors'

const pageLimit = 2


export default class IngredientService {
    private ingredientRepository: Repository<Ingredient>

    constructor(ingredientRepository: Repository<Ingredient>) {
        this.ingredientRepository = ingredientRepository
    }

    async getIngredientsList(pageNumber: string) {
        const offset = parseInt(pageNumber) * pageLimit - pageLimit
        const donutsList = await this.ingredientRepository.find({ take: pageLimit, skip: offset })

        return donutsList
    }

    async getPageCount() {
        const ingredientsCount = await this.ingredientRepository.count()
        const pageCount = Math.ceil(ingredientsCount / pageLimit)

        return pageCount
    }

    async createIngredient(newIngredientData: createIngredientDto) {
        const { name } = newIngredientData
        const isIngredientExists = await this.ingredientRepository.count({
            where: {
                name: name
            }
        }) != 0

        if (isIngredientExists) {
            throw ApiError.badRequest(
                'Ошибка создания записи!',
                ['Ингедиент с таким названием уже существует!']
            )
        }

        const newIngredient = this.ingredientRepository.create(newIngredientData)
        await this.ingredientRepository.save(newIngredient)
    }

    async findIngredientsByName(names: string[]) {
        const ingredients = await this.ingredientRepository.find({
            where: {
                name: In(names),
            }
        })

        return ingredients
    }
}