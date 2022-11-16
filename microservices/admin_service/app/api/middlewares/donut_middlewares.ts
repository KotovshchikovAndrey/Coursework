import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import ApiError from '../../utils/exceptions/api_errors'
import { Validator } from './interfaces'


class DonutDetailValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateId(req.params.id)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest("Передан некорректный id!", this.errorsArray))
        }

        next()
    }

    private validateId(id: string) {
        if (isNaN(parseInt(id))) {
            this.errorsArray.push('id должен быть числом!')
        }
    }
}


class DonutCreationValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.validateName(req.body.name)
        this.validatePrice(req.body.price)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest("Введены невалидные данные!", this.errorsArray))
        }

        next()
    }

    private validateName(name: unknown) {
        if (typeof name === 'undefined') {
            this.errorsArray.push('Введите название пончика!')
        } else if (typeof name !== 'string') {
            this.errorsArray.push('Название пончика должны быть строкой!')
        }
    }

    private validatePrice(price: unknown) {
        if (typeof price === 'undefined') {
            this.errorsArray.push('Введите название пончика!')
        } else if (typeof price !== 'number') {
            this.errorsArray.push('Цена должна быть числом!')
        }
    }
}


type donutValidator = 'CreationValidator' | 'DetailValidator'

export default function createDonutValidator(validatorName: donutValidator): Validator {
    switch (validatorName) {
        case 'DetailValidator':
            return new DonutDetailValidator()
        case 'CreationValidator':
            return new DonutCreationValidator()
    }
}