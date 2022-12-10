import * as path from 'path'

const serviceConfig = {
    envPath: path.join(__dirname, '..', 'app', '.env'),
    defaultUploadDir: path.join(__dirname, '..', 'app', 'media')
}

export default serviceConfig