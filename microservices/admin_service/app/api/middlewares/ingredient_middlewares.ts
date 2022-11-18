import { Request, Response, NextFunction } from 'express'
import { Validator } from './interfaces'
import ApiError from '../../utils/exceptions/api_errors'


class CreationIngredientValidator implements Validator {
    private errorsList: Array<string>

    constructor() {
        this.errorsList = []
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateName(req.body.name)
        if (this.errorsList.length !== 0) {
            return next(ApiError.badRequest('Введены невалидные данные!', this.errorsList))
        }

        next()
    }

    private validateName(name: unknown) {
        if (typeof name === 'undefined') {
            this.errorsList.push('Заполните название инградиента!')
        }
    }
}


type ingredientValidator = 'CreationValidator'

export default function createIngredientValidator(validatorName: ingredientValidator): Validator {
    switch (validatorName) {
        case 'CreationValidator':
            return new CreationIngredientValidator()
    }
}