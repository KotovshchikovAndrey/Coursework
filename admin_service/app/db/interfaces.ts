export interface Donut {
    id: number
    name: string
    description: string
    price: number
    ingredients: Ingredient[]
}

export interface Ingredient {
    id: number
    name: string
    image: string
}