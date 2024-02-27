const mongoose = require("mongoose");

const controller_login = async (email, senha, modelo) => {
  try {
    const resultado = await modelo.find({ email: email });

    if (resultado.length > 0) {
      const usuario = resultado[0];

      if (usuario.senha === senha) {
        return 200; // Senha correta
      } else {
        return 401; // Senha incorreta
      }
    } else {
      return 404; // Usuário não encontrado
    }
  } catch (error) {
    console.error(error);
    return 500; // Erro interno do servidor
  }
};

const cadastrarUsuario = async (email, senha, modelo) => {
  try {
    // Implemente a lógica para cadastrar a senha no banco de dados
    const resultado = await modelo.findOneAndUpdate(
      { email: email },
      { senha: senha }, // Atualize isso com o campo correto no seu modelo
      { new: true }
    );

    if (!resultado) {
      return 404; // Usuário não encontrado
    }

    return 200; // Senha cadastrada com sucesso
  } catch (erro) {
    console.error(erro);
    return 500; // Erro interno do servidor
  }
};

const atualizarSenha = async (email, novaSenha, modelo) => {
  try {
    // Implemente a lógica para atualizar a senha no banco de dados
    const resultado = await modelo.findOneAndUpdate(
      { email: email },
      { senha: novaSenha }, // Atualize isso com o campo correto no seu modelo
      { new: true }
    );

    if (!resultado) {
      return 404; // Usuário não encontrado
    }

    return 200; // Senha atualizada com sucesso
  } catch (erro) {
    console.error(erro);
    return 500; // Erro interno do servidor
  }
};


module.exports = { 
  controller_login, 
  cadastrarUsuario, 
  atualizarSenha};
