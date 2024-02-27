const mongoose = require("mongoose")
const adminModelo = require("../models/admin/schema")

mongoose.Promise = global.Promise;

const cadastrar = ()=> {


const novoAdm1 = new adminModelo({
    email: "fatimaetp@gmail.com",
    senha: "1234",
    token: ""
})


const novoAdm2 = new adminModelo({
    email: "roccoroberto@gmail.com",
    senha: "1234",
    token: ""
})

const novoAdm3 = new adminModelo({
    email: "mangaze@gmail.com",
    senha: "1234",
    token: ""
})


adminModelo.find()
.then((result) =>{

    if(result > 0){
        console.log("Administradores ja cadastrados. ")
    }
    else{

        adminModelo.insertMany([novoAdm1, novoAdm2, novoAdm3])
        .then((admSalvo) => {
        console.log("Administrador salvo com sucesso" )
    })
        .catch((erro) =>{
        console.log("Erro" + erro)
})

    }   
})


// salvando


}

module.exports = cadastrar