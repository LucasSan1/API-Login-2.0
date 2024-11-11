const router = require("express").Router();
const userModelo = require("../models/user/schema");

const { removerToken } = require("../controllers/token");
const {controller_login, atualizarSenha} = require("../controllers/login_controller");
const { saveUser } = require("../models/user/insertUser");

router.put("/user/login", async (req, res) => {
  try {
    const email_usuario = req.body.email;
    const senha_usuario = req.body.senha;

    let resultado_login = await controller_login(
      email_usuario,
      senha_usuario,
      userModelo
    );

    switch (resultado_login) {
      case 200:
        let token = await gerarToken(email_usuario, userModelo);
        res.status(200).json(token);
        break;

      case 401:
        res.status(401).json("Senha incorreta");
        break;
      case 404:
        res.status(404).json("Usuario incorreto");
        break;
      default:
        res.status(500).json("Internal server erro");
        break;
    }
  } catch (erro) {
    res.status(500).json("internal server erro: " + erro);
  }
});

router.post("/user/logout", async(req,res) => {

  try {
    const email_user = req.body.email;
    const token_user = req.body.token;

    let resultado_login = await removerToken(
      email_user,
      token_user,
      userModelo
    );
    
    switch (resultado_login) {
      case 200:
        res.status(200).json("Token removido");
        break;

      case 403:
        res.status(403).json("Token não encontrado, não autorizado");
        break;
      case 404:
        res.status(404).json("Usuario não encontrado");
        break;
      default:
        res.status(500).json("Internal server erro");
        break;
    }
  } catch (erro) {
    res.status(500).json("internal server erro: " + erro);
  }
})

router.put("/user/update", async (req, res) => {

  try {
    const email_user = req.body.email;
    const nova_senha = req.body.nova_senha;

    const usuarioExiste = await userModelo.findOne({ email: email_user });

    if (!usuarioExiste) {
      return res.status(404).json("Usuário não encontrado");
    }

    let resultUpdate = await atualizarSenha(
      email_user,
      nova_senha,
      userModelo
    );

    switch (resultUpdate) {
      case 200:
        res.status(200).json("Senha atualizada com sucesso");
        break;
        
      case 401:
        res.status(401).json('Não foi possivel atualizar a senha')

      default:
        res.status(500).json("Erro interno do servidor");
        break;
    }
  } catch (erro) {
    res.status(500).json("Erro interno do servidor: " + erro);
  }
});

router.post("/user/register", async (req, res) => {

  try {
      const email_user = req.body.email;
      const senha_user = req.body.senha;
      const telefone_user = req.body.telefone

      let usuarioExistente = await userModelo.findOne({ email: email_user });

      if (usuarioExistente) {
          return res.status(409).json("Usuário já cadastrado");
      }

      let novoUsuario = await saveUser(
        email_user, 
        senha_user, 
        telefone_user
        );

      if (novoUsuario) {
         res.status(200).json("Usuario cadastrado com sucesso")
      
      } else {
          res.status(500).json("Erro ao cadastrar o usuário");
      }
  } catch (erro) {
    console.log(erro)
      res.status(500).json("Erro interno do servidor: " + erro);
  }
});


module.exports = router;
