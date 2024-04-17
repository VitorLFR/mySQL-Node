const express = require("express");
const exphbs = require("express-handlebars");
const mysql2 = require("mysql2");

/* Express*/
const app = express();

/* Configuração middleware para verificar solicitações com o tipo de conteúdo Body */
app.use(
  express.urlencoded({
    extended: true
  })
)

/* Configura o middleware para analisar solicitações com o tipo de conteúdo*/
app.use(express.json());

/* Configuração do Handlebars */
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

/* Primeira rota */
app.get("/", (req, res) => {
  /* res.send("Mandando info na tela"); */
  res.render("home");
});

/* Listando produtos */

app.get("/lista", (req, res) => {
  const sql = "SELECT * FROM Produto";
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const lista = data;
    res.render("listas", {lista});
  });
});

/* Cadastrando */

app.post("/lista/insertProdutos", (req, res) => {
  const produtoNome = req.body.nome;
  const produtoPreco = req.body.preco;
  const produtoDescricao = req.body.descricao;

  /* Query do SQL para cadastrar */
  const sql = `INSERT INTO Produto(nome, preco, descricao) VALUES ('${produtoNome}', '${produtoPreco}', '${produtoDescricao}')`

  conn.query(sql, function (err){

    if(err){
      console.log("Erro:", err);
      return false;
    }

    res.redirect("/lista");
  })  
})
/* Conexão com banco de dados */
const conn = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Mercado",
});

/* Configuração do Banco */
conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  /* Porta e executando o projeto */
  app.listen(3000);
  console.log("Conectou ao banco de dados");
});
