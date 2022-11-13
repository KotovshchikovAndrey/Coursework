export interface Donut {
    id: number
    name: string
    description: string
    price: number
}

export interface Ingredient {
    id: number
    name: string
    donut: Donut
}