export interface CreateDonutDto {
    name: string,
    description?: string,
    price: number
    ingredientsNames?: string[]
}

export interface UpdateDonutDto {
    name?: string,
    description?: string,
    price?: number,
    ingredientsNames?: string[]
}

export interface RemoveDonutIngredientDto {
    ingredientsNames?: string[]
}