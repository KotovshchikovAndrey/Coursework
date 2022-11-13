import { DataSource } from 'typeorm'
import databaseConfig from './config'
import * as models from './models'

// Настройка подключения к базе данных
const dataSourceConnection = new DataSource({ ...databaseConfig, entities: models })

export default dataSourceConnection