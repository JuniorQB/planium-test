import { Router } from "express";
import BeneficiaryController from "../Modules/Beneficiary/BeneficiaryController";

// INstancia a classe Rotas 
const beneficiaryRoute = Router();

//Instaciar classe beneficiarios 
const beneficiaryController = new BeneficiaryController()

//Rota para inserir no arquivo Beneficiarios
beneficiaryRoute.post('/', beneficiaryController.create )

export default beneficiaryRoute
