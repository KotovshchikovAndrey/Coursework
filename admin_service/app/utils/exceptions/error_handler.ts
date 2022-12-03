import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import ApiError from './api_errors'


export default function ApiErrorHandler(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            details: err.details
        })
    }

    console.log(err)
    return res.status(500).json({
        message: 'Непредвиденная ошибка сервера!',
        details: []
    })
}