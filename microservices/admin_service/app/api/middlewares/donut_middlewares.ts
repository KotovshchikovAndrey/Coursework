import { Request, Response, NextFunction } from 'express'
import ApiError from '../../utils/exceptions/api_errors'

interface Validator {
    validate(
        req: Request,
        res: Response,
        next: NextFunction
    ): void
}


class DonutsRequestValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        console.log(this)
        this.validateName(req.body.name)
        this.validatePrice(req.body.price)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest("Не заполнены обязательные поля!", this.errorsArray))
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


type validator = 'RequestValidator'

export default function addValidator(validatorName: validator): Validator {
    switch (validatorName) {
        case 'RequestValidator':
            return new DonutsRequestValidator()
    }
}