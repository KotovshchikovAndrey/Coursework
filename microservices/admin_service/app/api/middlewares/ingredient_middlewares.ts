import { Request, Response, NextFunction } from 'express'
import { Validator } from './interfaces'
import ApiError from '../../utils/exceptions/api_errors'


class IngredientCreationValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateName(req.body.name)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest('Введены невалидные данные!', this.errorsArray))
        }

        next()
    }

    private validateName(name: unknown) {
        if (typeof name === 'undefined') {
            this.errorsArray.push('Заполните название инградиента!')
        }
    }
}


type ingredientValidator = 'CreationValidator'

export default function createIngredientValidator(validatorName: ingredientValidator): Validator {
    switch (validatorName) {
        case 'CreationValidator':
            return new IngredientCreationValidator()
    }
}