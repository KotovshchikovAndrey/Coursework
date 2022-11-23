import { Request, Response, NextFunction } from 'express'
import { ingredientSqlRepository } from '../../../db/repositories'
import IngredientService from '../../../logic/ingredient_logic'


export default class IngredientController {
    static async getIngredientsList(req: Request, res: Response, next: NextFunction) {
        const ingredientService = new IngredientService(ingredientSqlRepository)
        const ingredientsList = await ingredientService.getIngredientsList(req.query.page as string)
        const pageCount = await ingredientService.getPageCount()

        return res.status(200).json({
            ingredients: ingredientsList,
            pageCount: pageCount
        })
    }

    static async createIngredient(req: Request, res: Response, next: NextFunction) {
        const ingredientService = new IngredientService(ingredientSqlRepository)
        try {
            await ingredientService.createIngredient(req.files, req.body)
            return res.status(201).json({
                message: 'Ингредиент создан!'
            })
        } catch (e) {
            return next(e)
        }
    }
}