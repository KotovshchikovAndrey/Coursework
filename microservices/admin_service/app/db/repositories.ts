import * as models from './models'
import dataSourceConnection from './database'

const donutSqlRepository = dataSourceConnection.getRepository(models.DonutModel)
const ingredientSqlRepository = dataSourceConnection.getRepository(models.IngredientModel)

export { donutSqlRepository, ingredientSqlRepository }

