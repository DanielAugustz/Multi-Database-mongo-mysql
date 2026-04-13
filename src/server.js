const express = require("express");
const { createPool, waitForMysql } = require("./config/mysql");
const { connectMongo } = require("./config/mongo");
const { MysqlContatoRepository } = require("./repositories/mysqlContatoRepository");
const { MongoContatoRepository } = require("./repositories/mongoContatoRepository");
const { MysqlContatoService } = require("./services/mysqlContatoService");
const { MongoContatoService } = require("./services/mongoContatoService");
const { mysqlContatosRouter } = require("./routes/mysqlContatos");
const { mongoContatosRouter } = require("./routes/mongoContatos");

const PORT = Number(process.env.PORT) || 3000;

async function main() {
  const pool = createPool();
  await waitForMysql(pool); // sem isto o container da API às vezes falha antes do MySQL

  const { client, db } = await connectMongo();

  const mysqlRepo = new MysqlContatoRepository(pool);
  const mongoRepo = new MongoContatoRepository(db);
  const mysqlService = new MysqlContatoService(mysqlRepo);
  const mongoService = new MongoContatoService(mongoRepo);

  const app = express();
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      mysql: "/api/mysql/contatos",
      mongo: "/api/mongo/contatos",
    });
  });

  app.use("/api/mysql/contatos", mysqlContatosRouter(mysqlService));
  app.use("/api/mongo/contatos", mongoContatosRouter(mongoService));

  const server = app.listen(PORT, () => {
    console.log(`API no ar → http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await pool.end().catch(() => {});
    await client.close().catch(() => {});
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
