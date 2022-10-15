require('dotenv').config()
import express from 'express'
import cors from 'cors'
import routes from './Routes';
const app = express()

//Determina o uso do Cors
app.use(cors())
//Define o uso de JSON no express
app.use(express.json())
// Define o uso de rotas
app.use(routes)
//Define a porta
app.listen(3333, ()=>{
    console.log("Servidor rodando na porta 3333")
})

