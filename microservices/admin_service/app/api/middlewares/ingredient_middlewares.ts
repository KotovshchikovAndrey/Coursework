import { Request, Response, NextFunction } from 'express'
import { DetailValidator, ListValidator } from './abstract_middlewares'
import { Validator } from './interfaces'
import ApiError from '../../utils/exceptions/api_errors'
import fileUpload from 'express-fileupload'
import * as path from 'path'


class IngredientListValidator extends ListValidator {
    validate(req: Request, res: Response, next: NextFunction) {
        this.validateQueryParams(req)
        next()
    }
}

class IngredientDetailValidator extends DetailValidator {
    constructor() {
        super()
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateId(req.params.id)
        if (this.errorsArray.length !== 0) {
            return next(ApiError.badRequest("Передан некорректный id!", this.errorsArray))
        }

        next()
    }
}


class IngredientCreationValidator implements Validator {
    private errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    validate(req: Request, res: Response, next: NextFunction) {
        this.validateName(req.body.name)
        this.validateImage(req.files)
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

    private validateImage(files: fileUpload.FileArray | null | undefined) {
        const image = files?.image as fileUpload.UploadedFile | undefined
        if (typeof image !== 'undefined') {
            const allowedExtension = ['.png', '.jpg', '.jpeg']
            const extensionName = path.extname(image.name)
            if (!allowedExtension.includes(extensionName)) {
                this.errorsArray.push(
                    'Недопустимый формат изображения! Изображение должно быть формата ' +
                    allowedExtension.join(' или')
                )
            }
        }
    }
}


type ingredientValidator = 'ListValidator' | 'DetailValidator' | 'CreationValidator'

export default function createIngredientValidator(validatorName: ingredientValidator): Validator {
    switch (validatorName) {
        case 'ListValidator':
            return new IngredientListValidator()
        case 'DetailValidator':
            return new IngredientDetailValidator()
        case 'CreationValidator':
            return new IngredientCreationValidator()
    }
}