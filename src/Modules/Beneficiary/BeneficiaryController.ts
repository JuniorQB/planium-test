import { Request, Response } from "express";
import {v4 as uuidv4} from 'uuid'
import PlansService from "../Plans/PlansService";
import BeneficiaryService from "./BeneficiaryService";

//Interface dos dados do beneficiário
interface BeneficiaryData {
    age: number;
    name: string;
    price?:number;
}
//Tipagem para o cadastro do plano escolhido para os beneficiários
export interface BeneficiaryProps {
    id: string;
    quantity: number;
    beneficiaryData : BeneficiaryData[]
    plan: string;
}

//classe de controle do beneficiário
export default class BeneficiaryController {
    
    //Metodo cria um novo cadastro do plano incluindo os beneficiários 
    public async create(request:Request, response:Response){
       
        //recebe os parâmetros enviados por POST
        const dataBeneficiary:BeneficiaryProps = request.body
        
        //Instanciamento da classe BeneficiaryService
        const beneficiaryServer = new BeneficiaryService()
        
        //verifica se existe um plano válido (campo registro do arquivo plans.json) 
        if(await PlansService.findPlan(dataBeneficiary.plan)){
            
            //Gera um id para o registro
            dataBeneficiary.id = uuidv4();
            
            // Salva o registro no arquivo beneficiários.json
            const dataService:any = await beneficiaryServer.saveBeneficiary(dataBeneficiary)
            
            // Se voltar erro envia cod. 500 como retorno
            if(dataService['error']!== undefined){
                return response.status(500).json(dataService)
            }

            //Retorna status 200 com as informações salvas 
            return response.status(200).json(dataService)
        } else {
            //erro caso não exista um plano válido
            return response.status(400).json({"error": "Plan not found"})
        }
    } 
}