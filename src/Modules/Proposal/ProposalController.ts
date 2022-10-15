import { Request, Response } from "express";
import editJsonFile from 'edit-json-file'
import BeneficiaryService from "../Beneficiary/BeneficiaryService";
import PlansService from "../Plans/PlansService";
import PricesService, {PriceData} from "../Plans/PricesService";

//classe responsável por manipular o arquivo proposta.json
export default class ProposalController {

    //Método para gerar proposta. - Passar o ID do cadastro do JSON benificiário
    public async generateProposal(request:Request, response:Response){
        //rece o id enviado por parametro na URL
        const {id} = request.params

        //Instancia da classe BeneficiaryService
        const beneficiaryRegistration = new BeneficiaryService()  
        //Instancia da classe PricesService
        const prices = new PricesService()

        //Criação das variáveis 
        let idPlanBeneficiary ="";
        let ages = undefined
        let pricePlan:PriceData;
        let DB_PROPOSAL = ""
       
        const beneficiariesData = beneficiaryRegistration.getBenifiaryById(id)

        // Atribui variavel de ambiente
        DB_PROPOSAL = process.env.DB_PROPOSAL || "";
        
        //atribui variáveis de ambiente das faixas etárias
        let faixa1:number;
        (process.env.MAX_FAIXA1?faixa1 = parseInt(process.env.MAX_FAIXA1): 0)
        let faixa2:number;
        (process.env.MAX_FAIXA2?faixa2 = parseInt(process.env.MAX_FAIXA2): 0)
        

        //verifica se retornou dados do metodo getBenifiaryById
        if(beneficiariesData){
            //plano escolhido para o cadastro
            idPlanBeneficiary = beneficiariesData.plan;
            //retorna as idades dos beneficiários cadastrados
            ages = beneficiariesData.beneficiaryData.map(data =>{
                return data.age
            })

            //Busca o plano esolhido
            const planData = await PlansService.findPlan(idPlanBeneficiary)
            //Busca o preço do plano escolhido 
            if(planData) pricePlan = prices.getPriceByCod(planData?.codigo ,beneficiariesData.quantity)
            
            //variável para soma total
            let totalSum = 0;
            
            //Inclui o preço por faixa etária dos planos escolhidos 
            beneficiariesData.beneficiaryData.map(data =>{
                 
                 if(data.age <= faixa1){
                    data.price = pricePlan.faixa1;
                 } else if(data.age < faixa2) {
                    data.price = pricePlan.faixa2;
                 } else {
                    data.price = pricePlan.faixa3;
                 }
                
                 //Soma do total do plano
                 data.price && (totalSum += data.price)
            })


            //Junção dos dados dos beneficiários com o preço total
            const data = {
                beneficiariesData,
                totalSum
        }

        // Recebe o arquivo proposta.json
        let file = editJsonFile(DB_PROPOSAL, {
            autosave: true
        })
        //salva dos dados da proposta
        file.append("Proposta", data)

        //retorna os dados criados
        response.json(data)
        } else {
            //retorna erro caso o id do cadastro não seja encontrado
            return response.json({"error":"Beneficiary not found"})
        }

    }
}