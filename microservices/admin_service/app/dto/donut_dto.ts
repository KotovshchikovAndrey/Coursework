import { Ingredient } from '../db/interfaces'

export interface CreateDonutDto {
    name: string,
    description?: string,
    price: number
    ingredientsNames?: string[]
}

export interface UpdateDonutDto {
    name?: string,
    description?: string,
    price?: number
    ingredientsNames?: string[]
}