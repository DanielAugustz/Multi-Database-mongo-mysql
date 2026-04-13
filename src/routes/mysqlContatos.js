const express = require("express");
const { MysqlContatoController } = require("../controllers/mysqlContatoController");

function mysqlContatosRouter(service) {
  const r = express.Router();
  const c = new MysqlContatoController(service);

  r.get("/", c.listar);
  r.get("/:id", c.buscar);
  r.post("/", c.criar);
  r.put("/:id", c.atualizar);
  r.delete("/:id", c.excluir);

  return r;
}

module.exports = { mysqlContatosRouter };
