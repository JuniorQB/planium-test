import { Request, Response } from "express";
import editJsonFile from 'edit-json-file'


//classe de controle de planos
export default class PlansController {
    
    //Metodo lista todos os planos
    public list(request:Request, response:Response){
      
      let DB_PLANS = ""

      //verifica se existe a variável de ambinete 
      if (process.env.DB_PLANS) {
        //atribui o valor da variável de ambiente 
         DB_PLANS = process.env.DB_PLANS;

         //recebe o arquivo plans.json
         let file = editJsonFile(DB_PLANS)
 
         //retorna todo conteúdo do arquivo plans.json
        return response.status(201).json(file.read());
 
      } else {
        //Retorna erro caso não esteja definido a variável de ambiente
         return response.status(500).json({"error": "DB_PLANS environment variable is not set"});
       }

    }    
}