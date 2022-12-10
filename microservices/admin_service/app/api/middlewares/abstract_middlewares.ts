import { Request, Response, NextFunction } from 'express'
import { Validator } from './interfaces'


export abstract class ListValidator implements Validator {
    protected errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    abstract validate(req: Request, res: Response, next: NextFunction): void

    protected validateQueryParams(req: Request) {
        const page = req.query.page
        const pageNumber = Number(page)
        if (pageNumber.toString() !== page) {
            req.query.page = '1'
        } else if (pageNumber < 1) {
            req.query.page = '1'
        } else {
            req.query.page = pageNumber.toString()
        }
    }
}


export abstract class DetailValidator implements Validator {
    protected errorsArray: Array<string>

    constructor() {
        this.errorsArray = []
    }

    abstract validate(req: Request, res: Response, next: NextFunction): void

    protected validateId(id: string) {
        const intId = parseInt(id)
        if (intId.toString() !== id) {
            this.errorsArray.push('id должен быть целым числом!')
        }
    }
}