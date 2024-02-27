const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config({ path: "../.env" });

const secretKey = process.env.JWT_SECRET || "fallbackSecret"; // Use variável de ambiente ou uma chave padrão

async function gerarToken(email, modelo) {
  try {
    const token = jwt.sign({ email: email }, secretKey, { algorithm: "HS256" });

    const resultado = await modelo.findOneAndUpdate(
      { email: email },
      { token: token },
      { new: true }
    );

    if (!resultado) {
      // Trate conforme necessário
      return null;
    }

    return token;
  } catch (error) {
    // Trate conforme necessário
    return null;
  }
}

const verificarToken = async (email, token, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.token === token) {
        return 200; 
      } else {
        return 403; 
      }
    } else {
      return 404; 
    }
  } catch (erro) {
    console.log(error);
    return 500;
  }
};


const removerToken = async (email, token, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.token === token) {
        await modelo.findOneAndUpdate(
          { email: email },
          { token: undefined },
          { new: true }
        )
        .then((resultado) =>{
          return 200; 
          
        })
        .catch((erro) =>{
          console.log(erro)
          return 500 
        })
      } else {
        return 403; 
      }
    } else {
      return 404;
    }
  } catch (erro) {
    console.log(error);
    return 500;
  }
};

module.exports = {
  gerarToken,
  verificarToken,
  removerToken,
};
