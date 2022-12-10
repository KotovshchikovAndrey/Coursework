import { Request, Response, NextFunction } from 'express'

export interface Validator {
    validate(
        req: Request,
        res: Response,
        next: NextFunction
    ): void
}