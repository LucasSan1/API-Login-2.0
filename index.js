//Import das bibliotecas
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Import dos scripts

const script_admin = require("./scripts/adminScript");


//Middleware config

app.use(cors());
app.use(express.json());

// Middleware para fechar a conexão após o processamento
const closeConnectionMiddleware = (req, res, next) => {
  // Intercepta o método end para adicionar o fechamento da conexão
  const originalEnd = res.end;

  res.end = (...args) => {
    originalEnd.apply(res, args);
    res.connection.end(); // Fecha a conexão após o término da resposta
  };

  next();
};
//recebendo arquivos em formato json

//configurando variaveis de ambiente
dotenv.config();

// Configuração do servidor
const server_port = process.env.SERVER_PORT || 3000;
const banco_string =
  process.env.BANCO_STRING || "mongodb://localhost:27017/teste"; //mudar string de conexao com o banco no .env


// Defina as opções do Swagger JSDoc

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Azure Crud",
      version: "1.0.0",
      description:
        "A api tem como função fazer a autenticação de usuario",
    },
  },
  apis: ["./docs/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Use o Swagger UI Express para servir a documentação Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// rotas
const rota_admin = require("./routes/admin");


app.use(closeConnectionMiddleware);
app.use("", rota_admin);

app.use("/", (req, res) => {
  res.json({
    link_repositorio: "",
    status_server: "OK",
    obs: "Para acessar as documentações utilize por /api-docs",
  });
});

// conectando com o banco
mongoose
  .connect(banco_string,{
    dbname:"producao"})
  .then(() => {
    console.log("Conectado ao banco com sucesso.: " + banco_string);

    app.listen(server_port, "0.0.0.0", () => {
      console.log("Servidor aberto na porta: " + server_port);
    });

    // Chamando os scripts de insert caso o banco esteja vazio

    const executar_script = async () => {
      script_admin();
      try{
        script_categoria();
      } 
      finally{
        script_produto();

      }
    };

    executar_script();
  })
  .catch((erro) => {
    console.log("Erro ao conectar ao banco de dados: " + erro);
  });
