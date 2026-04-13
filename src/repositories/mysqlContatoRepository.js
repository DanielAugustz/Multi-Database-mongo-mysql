class MysqlContatoRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const [rows] = await this.pool.query(
      "SELECT id, nome, telefone FROM contatos ORDER BY id"
    );
    return rows;
  }

  async findById(id) {
    const [rows] = await this.pool.query(
      "SELECT id, nome, telefone FROM contatos WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async create({ nome, telefone }) {
    const [result] = await this.pool.query(
      "INSERT INTO contatos (nome, telefone) VALUES (?, ?)",
      [nome, telefone]
    );
    return this.findById(result.insertId);
  }

  async update(id, { nome, telefone }) {
    const [result] = await this.pool.query(
      "UPDATE contatos SET nome = ?, telefone = ? WHERE id = ?",
      [nome, telefone, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  }

  async remove(id) {
    const [result] = await this.pool.query("DELETE FROM contatos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = { MysqlContatoRepository };
