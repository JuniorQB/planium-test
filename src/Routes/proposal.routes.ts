import { Router } from "express";
import ProposalController from "../Modules/Proposal/ProposalController";

//Instancia a classe Router do Express
const proposalRoute = Router();

//Instancia a classe ProposalController
const proposalController = new ProposalController()

//Define a rota get da listagem dos proposal. - Obrigatorio passar um id como parametro. 
//ID encontrase no arquivo beneficiários.json 
proposalRoute.get('/:id', proposalController.generateProposal)

export default proposalRoute
