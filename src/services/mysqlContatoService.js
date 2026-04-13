class MysqlContatoService {
  constructor(repo) {
    this.repo = repo;
  }

  listar() {
    return this.repo.findAll();
  }

  buscar(id) {
    const n = Number(id);
    if (!Number.isInteger(n) || n < 1) {
      return Promise.resolve({ erro: "id inválido" });
    }
    return this.repo.findById(n).then((row) => {
      if (!row) return { erro: "não há nada com esse id" };
      return row;
    });
  }

  criar(body) {
    const v = this.validar(body);
    if (v) return Promise.resolve({ erro: v });
    return this.repo.create(body);
  }

  atualizar(id, body) {
    const n = Number(id);
    if (!Number.isInteger(n) || n < 1) {
      return Promise.resolve({ erro: "id inválido" });
    }
    const v = this.validar(body);
    if (v) return Promise.resolve({ erro: v });
    return this.repo.update(n, body).then((row) => {
      if (!row) return { erro: "não há nada com esse id" };
      return row;
    });
  }

  excluir(id) {
    const n = Number(id);
    if (!Number.isInteger(n) || n < 1) {
      return Promise.resolve({ erro: "id inválido", removido: false });
    }
    return this.repo.remove(n).then((ok) => {
      if (!ok) return { erro: "não há nada com esse id", removido: false };
      return { removido: true };
    });
  }

  validar({ nome, telefone }) {
    if (!nome || String(nome).trim() === "") return "falta o nome";
    if (!telefone || String(telefone).trim() === "") return "falta o telefone";
    return null;
  }
}

module.exports = { MysqlContatoService };
