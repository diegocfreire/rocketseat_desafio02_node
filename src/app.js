const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

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

  const r = {"id": uuid(), title, url, techs, "likes": 0}

  repositories.push(r);

  return res.json({
    message: 'Repositório adicionado com sucesso.',
    repositorio: r
  });
});

/**
 * PUT: Altera as informações de um determinado repositório
 */
app.put("/repositories/:id", (req, res) => {
  const { title, url, techs } = req.body;
  const id = req.params.id;

  const idx = repositories.findIndex(r => r.id == id);

  if (idx < 0) {
    return res.status(400).json({error: 'Repositório não encontrado.'});
  }

  const r = {id, title, url, techs, likes: repositories[idx].likes};

  repositories[idx] = r;

  return res.json({
    message: 'Repositório alterado com sucesso.',
    repositorio: r
  });
});

/**
 * DELETE: Remove um repositório pelo id informado
 */
app.delete("/repositories/:id", (req, res) => {
  const id = req.params.id;

  const idx = repositories.findIndex(r => r.id == id);

  if (idx < 0) {
    return res.status(400).json({error: 'Repositório não encontrado.'});
  }

  repositories.splice(idx,1);

  return res.status(204).send();
});

/**
 * POST: Adiciona novo like ao repositório informado
 */
app.post("/repositories/:id/like", (req, res) => {
  const id = req.params.id;

  const idx = repositories.findIndex(r => r.id == id);

  repositories[idx].likes++;

  return res.json({
    message: 'Like adicionado com sucesso.',
    repositorio: repositories[idx]
  });
});

module.exports = app;
