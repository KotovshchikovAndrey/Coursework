import * as models from './models'
import dataSourceConnection from './database'

const donutSqlRepository = dataSourceConnection.getRepository(models.DonutModel)

export { donutSqlRepository }

