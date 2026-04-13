const express = require("express");
const { MongoContatoController } = require("../controllers/mongoContatoController");

function mongoContatosRouter(service) {
  const r = express.Router();
  const c = new MongoContatoController(service);

  r.get("/", c.listar);
  r.get("/:id", c.buscar);
  r.post("/", c.criar);
  r.put("/:id", c.atualizar);
  r.delete("/:id", c.excluir);

  return r;
}

module.exports = { mongoContatosRouter };
