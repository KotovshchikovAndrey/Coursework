import { Ingredient } from '../db/interfaces'

export interface createDonutDto {
    name: string,
    description?: string,
    price: number
    ingredientsNames?: string[]
}