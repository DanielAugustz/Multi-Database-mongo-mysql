const { ObjectId } = require("mongodb");

// mensagem comprida de propósito — assim não misturo com erro de registo inexistente
const ID_MONGO_ERRADO = "id do Mongo não bate certo (24 hex)";

class MongoContatoService {
  constructor(repo) {
    this.repo = repo;
  }

  listar() {
    return this.repo.findAll();
  }

  buscar(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve({ erro: ID_MONGO_ERRADO });
    }
    return this.repo.findById(id).then((row) => {
      if (!row) return { erro: "não encontrei esse contacto" };
      return row;
    });
  }

  criar(body) {
    const v = this.validar(body);
    if (v) return Promise.resolve({ erro: v });
    return this.repo.create(body);
  }

  atualizar(id, body) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve({ erro: ID_MONGO_ERRADO });
    }
    const v = this.validar(body);
    if (v) return Promise.resolve({ erro: v });
    return this.repo.update(id, body).then((row) => {
      if (!row) return { erro: "não encontrei esse contacto" };
      return row;
    });
  }

  excluir(id) {
    if (!ObjectId.isValid(id)) {
      return Promise.resolve({
        erro: ID_MONGO_ERRADO,
        removido: false,
      });
    }
    return this.repo.remove(id).then((ok) => {
      if (!ok) return { erro: "não encontrei esse contacto", removido: false };
      return { removido: true };
    });
  }

  validar({ nome, telefone }) {
    if (!nome || String(nome).trim() === "") return "sem nome não dá";
    if (!telefone || String(telefone).trim() === "")
      return "falta o número";
    return null;
  }
}

module.exports = { MongoContatoService };
