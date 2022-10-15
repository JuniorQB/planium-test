import editJsonFile from 'edit-json-file'

//Tipagem do arquivo prices.json
export interface PriceData {
    codigo?: number;
    minimo_vidas?: number;
    faixa1?: number;
    faixa2?: number;
    faixa3?: number;
}

//classe responsável por manipular o arquivo prices.json
export default class PricesService {

    //Metodo para buscar o preço do plano pelo código e quantidade de beneficiários
    public getPriceByCod(code:number, quantity:number){
        let DB_PRICES = ""

        //verifica se existe a variável de ambiente
        DB_PRICES = process.env.DB_PRICES || "";
        
        //Atribui o arquivo prices.json
        let file = editJsonFile(DB_PRICES)

        //Recebe os dados do arquivo prices.json
        const prices:PriceData[] = file.get();

        //filtra pelo codigo e idade
        const pricesData = prices.filter(data =>{
            if(data.codigo === code 
                && data.minimo_vidas !== undefined 
                && quantity > data.minimo_vidas ){
                return data  
            }
        })

        //utilizando reduce para determinar qual plano utilizar pelo minimo_vidas
        //caso exista mais de um com o mesmo código
        const selectedPrice = pricesData.reduce((m, d) => m.minimo_vidas!== undefined 
            && d.minimo_vidas !== undefined 
            && m.minimo_vidas > d.minimo_vidas? m:d )

        // retorno do plano selecionado 
        return selectedPrice;
    }
}