const adminModelo = require("../models/admin/schema");
const router = require("express").Router();

const { gerarToken, verificarToken, removerToken } = require("../controllers/token");
const {controller_login, cadastrarUsuario, atualizarSenha} = require("../controllers/login_controller");

router.put("/admin/login", async (req, res) => {
 
  try {
    const email_admin = req.body.email;
    const senha_admin = req.body.senha;

    let resultado_login = await controller_login(
      email_admin,
      senha_admin,
      adminModelo
    );

    switch (resultado_login) {
      case 200:
        let token = await gerarToken(email_admin, adminModelo);
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

//Rota que recupera o token para verificar se o admin está logado ou não
router.post("/admin/token",async(req,res) =>{

  try {
    const email_admin = req.body.email;
    const token_admin = req.body.token;

    let resultado_login = await verificarToken(
      email_admin,
      token_admin,
      adminModelo
    );

    switch (resultado_login) {
      case 200:
        res.status(200).json("Token correto");
        break;

      case 403:
        res.status(403).json("Token incorreto");
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

})

router.post("/admin/logout", async(req,res) => {


  try {
    const email_admin = req.body.email;
    const token_admin = req.body.token;

    let resultado_login = await removerToken(
      email_admin,
      token_admin,
      adminModelo
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

router.put("/admin/update", async (req, res) => {

  try {
    const email_admin = req.body.email;
    const nova_senha = req.body.nova_senha;

    const usuarioExiste = await adminModelo.findOne({ email: email_admin });

    if (!usuarioExiste) {
      return res.status(404).json("Usuário não encontrado");
    }

    let resultUpdate = await atualizarSenha(
      email_admin,
      nova_senha,
      adminModelo
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



router.post("/admin/registro", async (req, res) => {

  try {
      const email_admin = req.body.email;
      const senha_admin = req.body.senha;

      let usuarioExistente = await adminModelo.findOne({ email: email_admin });

      if (usuarioExistente) {
          return res.status(409).json("Usuário já cadastrado");
      }

      let novoUsuario = await cadastrarUsuario(
        email_admin, 
        senha_admin, 
        adminModelo
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
