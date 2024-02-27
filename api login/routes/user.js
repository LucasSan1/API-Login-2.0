const router = require("express").Router();
const userModelo = require("../models/user/schema");

router.post("/user/login", async (req, res) => {
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



module.exports = router;
