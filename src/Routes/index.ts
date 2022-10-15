import {Router} from 'express'

//Importações das rotas
import plansRoute from './plans.routes'
import beneficiaryRoute from './beneficiary.routes'
import proposalRoute from './proposal.routes'

//Instancia da classe Router - Express
const routes = Router()

//define as rotas passando como parâmetro a rota oara cada módulo
routes.use('/plans', plansRoute)
routes.use('/beneficiary', beneficiaryRoute)
routes.use('/proposal', proposalRoute)

export default routes