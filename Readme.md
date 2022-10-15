
# Desafio Planium - BackEnd

Criar um sistema de cadastro de beneficiários e ao final gerar uma proposta com base na tabela de planos e preços



## Bibliotecas utilizadas

- Express
- dotenv
- edit-json-file
- cors
- uuid

-> Desenvolvimento 
- ts-node-dev 
- TypeScript 


## Variáveis de Ambiente

Estão incluídas as seguintes variáveis de ambiente no arquivo .env
Os valores estão incluídos nesta documentação:

`DB_PLANS`="./src/utils/db/plans.json"

`DB_PRICES`="./src/utils/db/prices.json"

`DB_BENEFICIARY`="./src/utils/db/beneficiarios.json"

`DB_PROPOSAL`="./src/utils/db/proposta.json"

`MAX_FAIXA1`=17 

`MAX_FAIXA2`=40


## Documentação da API

```http
  GET /plans
```
#### Retorna todos os planos do arquivo JSON plans.json

```http
  POST /beneficiary
```
#### Retorna todos os planos do arquivo JSON plans.json


```http
  GET /proposal/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do cadastro de beneficiario cadastrado em beneficiarios.json|

#### Retorna uma proposta com base no preço de cada beneficiário por faixa etárioa do plano escolhido 



## Funcionalidades

- Criação de cadstros com seus respecitivos beneficiários
- Listagem de todos os planos
- Criação de proposta com base no preço por faixa etária do plano escolhido



## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd backend
```

Instale as dependências

```bash
  yarn 
```

Inicie o servidor

```bash
  yarn run dev
```

No navegador  - Listar os planos
http://localhost:3333/plans

No Insomnia -  Inserir o cadastro
POST - http://localhost:3333/beneficiary
Modelo de dados JSON para inserir
{
		"quantity": 2,
    "beneficiaryData" : [
		{
			"name": "Fulano de tal",
			"age": 29
		},
		{
			"name": "José Barbosa",
			"age": 36
		}
		],
    "plan": "reg2"
}


No navegador - Gerar a proposta 
http://localhost:3333/proposal/(ID do cadastrado no beneficiarios.json)



## Melhorias

- Melhorar as validações dos dados do beneficiário, como verificar se o tamanho do array de beneficiários é igual ao da quantidade informada
- Melhorar validações no código 
- Aproveitar de forma mais eficaz as tipagens 
- Buscar melhores implementações referente as rotas
- Buscar outras bibliotecas que possam contribuir com o desenvolvimento desse projeto

## Autor

- [@juniorQb](https://github.com/JuniorQB)

