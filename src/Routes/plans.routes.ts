import { Router } from "express";
import PlansController from "../Modules/Plans/PlansController";

//Instancia a classe Router do Express
const plansRoute = Router();

//Instancia a classe PlansController
const plansController = new PlansController()

//Define a rota get da listagem dos plans 
plansRoute.get('/', plansController.list )


export default plansRoute
