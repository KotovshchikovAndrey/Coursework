export default class ApiError extends Error {
    public status: number
    public message: string
    public details: Array<string>

    constructor(
        status: number, 
        message: string, 
        details: Array<string>
    ) {
        super()
        this.status = status
        this.message = message
        this.details = details
    }

    static badRequest(message: string, details: Array<string> = []) {
        return new ApiError(400, message, details)
    }

    static forbidden(message: string, details: Array<string> = []) {
        return new ApiError(403, message, details)
    }

    static internal(message: string, details: Array<string> = []) {
        return new ApiError(500, message, details)
    }
}