const mysql = require("mysql2/promise");

function createPool() {
  return mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "root",
    database: process.env.MYSQL_DATABASE || "daniel",
    waitForConnections: true,
    connectionLimit: 10,
  });
}

// no Docker o MySQL demora a ficar pronto; isto evita a app a desistir logo à primeira
async function waitForMysql(pool, attempts = 30, delayMs = 2000) {
  for (let i = 0; i < attempts; i++) {
    try {
      const c = await pool.getConnection();
      await c.ping();
      c.release();
      return;
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("O MySQL não respondeu — espera um pouco e tenta outra vez.");
}

module.exports = { createPool, waitForMysql };
