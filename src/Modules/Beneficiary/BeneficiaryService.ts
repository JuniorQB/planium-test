import editJsonFile from 'edit-json-file'
import { BeneficiaryProps } from "./BeneficiaryController";

//classe responsável por manipular o arquivo beneficiarios.json
export default class BeneficiaryService{
    
  //salva um novo registro com o plano e beneficiários 
    public async saveBeneficiary(data:BeneficiaryProps){

       //Declarar a variável para receber a variável de ambiente 
      let DB_BENEFICIARY = ""
      
      //Verifica se existe a variável de ambiente
      if (process.env.DB_BENEFICIARY) {
        //atribui o valor 
        DB_BENEFICIARY = process.env.DB_BENEFICIARY;
        
        //variavel file recebe o arquivo a ser manipulado - beneficiários.json
        let file = editJsonFile(DB_BENEFICIARY, {
            autosave: true
        })

        //adiciona o valor no arquivo
        file.append("Registros", data)

        //devolve o objeto criado 
        return data;
      } else {
        //Retorna erro caso não esteja definido a variável de ambiente
        return {"error": "DB_BENEFICIARY environment variable is not set"}
       }

    }

    //Metodo para buscar o cadastro no arquivo beneficiarios pelo ID
    public getBenifiaryById(id:string){
        let DB_BENEFICIARY = ""
        
          // Atribui a variável de ambiente
          DB_BENEFICIARY = process.env.DB_BENEFICIARY || "";
        
          //Atribui o arquivo beneficiários
          let file = editJsonFile(DB_BENEFICIARY)
          
          //busca todos os dados do objeto
          const beneficiaries:BeneficiaryProps[] = file.get('Registros');

          //filtra pelo ID enviado
          const beneficiary = beneficiaries.find((data) =>{
              return data.id === id
          })

          //Se encontrar retorna os dados
          if(beneficiary){
            return beneficiary
          }
          else {
            //se não encontrar retorna indefinido
            return undefined
          }  
    }

    
}