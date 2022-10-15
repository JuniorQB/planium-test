import plans from '../../utils/db/plans.json'

//Tipagem para o objeto plan
export interface PlansProps {
    registro: string;
    nome: string;
    codigo:number;
}

//classe responsável por manipular o arquivo plans.json
export default class PlansService {

// metodo estático que encontra um plano 
public static async findPlan(registroPlan:string){

        //verifica se existe o plano escolhido. Se existir retorna todos os dados desse plano
        // se não existir retonar como undefined
       const plan:PlansProps | undefined = plans.find(data =>{
            return data.registro === registroPlan
       })
        
        return plan;
    }
}