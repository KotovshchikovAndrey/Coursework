import { Request, Response, NextFunction } from 'express'
import { DetailValidator, ListValidator } from './abstract_middlewares'
import ApiError from '../../utils/exceptions/api_errors'
import { Validator } from './interfaces'


class DonutListValidator extends ListValidator {
    validate(req: Request, res: Response, next: NextFunction) {
        this.validateQueryParams(req)
        next()
    }
}


class DonutDetailValidator extends DetailValidator {
    constructor() {
        super()
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateId(req.params.id)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest('Передан некорректный id!', this.errorsArray))
        }

        next()
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
            return next(ApiError.badRequest('Введены невалидные данные!', this.errorsArray))
        }

        next()
    }

    private validateName(name: unknown) {
        if (typeof name === 'undefined') {
            this.errorsArray.push('Введите название пончика!')
        }
    }

    private validatePrice(price: unknown) {
        if (typeof price === 'undefined') {
            this.errorsArray.push('Введите цену пончика!')
        } else if (typeof price !== 'number') {
            this.errorsArray.push('Цена должна быть числом!')
        }
    }
}


class DonutUpdateValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateId(req.params.id)
        this.validatePrice(req.body.price)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest('Введены невалидные данные!', this.errorsArray))
        }

        next()
    }

    private validateId(id: string) {
        const intId = parseInt(id)
        if (intId.toString() !== id) {
            this.errorsArray.push('id должен быть целым числом!')
        }
    }

    private validatePrice(price: unknown) {
        if (typeof price === 'undefined') {
            this.errorsArray.push('Введите цену пончика!')
        } else if (typeof price !== 'number') {
            this.errorsArray.push('Цена должна быть числом!')
        }
    }
}


type donutValidator = 'UpdateValidator' | 'CreationValidator' | 'DetailValidator' | 'ListValidator'

export default function createDonutValidator(validatorName: donutValidator): Validator {
    switch (validatorName) {
        case 'DetailValidator':
            return new DonutDetailValidator()
        case 'CreationValidator':
            return new DonutCreationValidator()
        case 'UpdateValidator':
            return new DonutUpdateValidator()
        case 'ListValidator':
            return new DonutListValidator()
    }
}