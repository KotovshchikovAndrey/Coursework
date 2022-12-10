import * as path from 'path'
import fileUpload from 'express-fileupload'
import * as crypto from 'crypto'
import * as fs from 'fs'
import serviceConfig from '../../config'


export default class FileUploader {
    private uploadDir: string

    constructor(uploadDir?: string) {
        this.uploadDir = uploadDir ?? serviceConfig.defaultUploadDir + '/ingredients'
    }

    async upload(file: fileUpload.UploadedFile) {
        let fileName = file.name
        if (this.isExists(fileName)) {
            fileName = this.generateUniqueName(fileName)
        }

        const uploadPath = this.uploadDir + `/${fileName}`
        await file.mv(uploadPath)

        return fileName
    }

    private isExists(fileName: string) {
        const filePath = this.uploadDir + `/${fileName}`
        if (fs.existsSync(filePath)) {
            return true
        }

        return false
    }

    private generateUniqueName(fileName: string) {
        const [name, ext] = fileName.split('.')
        const uuid = crypto.randomUUID()
        let newFileName = name + uuid
        if (newFileName.length > 255) {
            newFileName = newFileName.slice(0, 255 - ext.length)
        }

        return newFileName + '.' + ext
    }
}