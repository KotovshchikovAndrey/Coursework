import express, { Request, Response, NextFunction } from 'express'
import IngredientController from '../controllers/ingredient_controller'
import createIngredientValidator from '../../middlewares/ingredient_middlewares'

const ingredientRouter = express.Router()

ingredientRouter
    .all('/all', IngredientController.getIngredientsList)
    .post(
        '/',
        (req: Request, res: Response, next: NextFunction) => {
            createIngredientValidator('CreationValidator').validate(req, res, next)
        },
        IngredientController.createIngredient
    )
    .delete(
        '/:id',
        (req: Request, res: Response, next: NextFunction) => {
            createIngredientValidator('DetailValidator').validate(req, res, next)
        },
        IngredientController.deleteIngredient
    )

export default ingredientRouter
