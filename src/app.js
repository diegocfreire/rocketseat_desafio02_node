const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

repositories = [];

/**
 * GET: Lista todos os repositórios cadastrados.
 */
app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

/**
 * POST: Cadastra um novo repositório
 */
app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const r = {
    "id": uuid(),
    "title": title,
    "url": url,
    "techs": techs,
    "likes": 0
  }

  repositories.push(r);

  return res.json({message: 'Repositório adicionado com sucesso.'});
});

/**
 * PUT: Altera as informações de um determinado repositório
 */
app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body;
  const id = req.params.id;

  const rIndex = repositories.findIndex(r => r.id == id);

  repositories[rIndex].title = title;
  repositories[rIndex].url = url;
  repositories[rIndex].techs = techs;

  return res.json({message: 'Repositório alterado com sucesso.'});
});

/**
 * DELETE: Remove um repositório pelo id informado
 */
app.delete("/repositories/:id", (req, res) => {
  repositories = repositories.filter(function(r) {
    return r.id !== req.params.id
  });

  return res.json({message: 'Repositório removido com sucesso.'});
});

/**
 * POST: Adiciona novo like ao repositório informado
 */
app.post("/repositories/:id/like", (req, res) => {
  const id = req.params.id;

  const rIndex = repositories.findIndex(r => r.id == id);

  repositories[rIndex].likes++;

  return res.json({message: 'Like adicionado com sucesso.'});
});

module.exports = app;
