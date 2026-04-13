class MysqlContatoController {
  constructor(service) {
    this.service = service;
  }

  listar = async (_req, res) => {
    const data = await this.service.listar();
    res.json(data);
  };

  buscar = async (req, res) => {
    const out = await this.service.buscar(req.params.id);
    if (out.erro === "id inválido") return res.status(400).json(out);
    if (out.erro) return res.status(404).json(out);
    res.json(out);
  };

  criar = async (req, res) => {
    const out = await this.service.criar(req.body);
    if (out.erro) return res.status(400).json(out);
    res.status(201).json(out);
  };

  atualizar = async (req, res) => {
    const out = await this.service.atualizar(req.params.id, req.body);
    if (out.erro === "id inválido") return res.status(400).json(out);
    if (out.erro?.startsWith("falta")) return res.status(400).json(out);
    if (out.erro) return res.status(404).json(out);
    res.json(out);
  };

  excluir = async (req, res) => {
    const out = await this.service.excluir(req.params.id);
    if (out.erro === "id inválido") return res.status(400).json(out);
    if (out.erro) return res.status(404).json(out);
    res.json(out);
  };
}

module.exports = { MysqlContatoController };
