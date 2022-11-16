import { Repository } from 'typeorm'
import { Ingredient } from '../db/interfaces'
// import { createDonutDto } from '../dto/donut_dto'
import ApiError from '../utils/exceptions/api_errors'


export default class IngredientService {
    private ingredientRepository: Repository<Ingredient>

    constructor(ingredientRepository: Repository<Ingredient>) {
        this.ingredientRepository = ingredientRepository
    }
}