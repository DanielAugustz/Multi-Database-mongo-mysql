const { ObjectId } = require("mongodb");

class MongoContatoRepository {
  constructor(db) {
    // nome da coleção — podia ser outro, mas "contatos" basta
    this.collection = db.collection("contatos");
  }

  async findAll() {
    const docs = await this.collection
      .find({})
      .project({ nome: 1, telefone: 1 })
      .sort({ _id: 1 })
      .toArray();
    return docs.map((d) => ({
      id: d._id.toString(),
      nome: d.nome,
      telefone: d.telefone,
    }));
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) return null;
    const d = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!d) return null;
    return { id: d._id.toString(), nome: d.nome, telefone: d.telefone };
  }

  async create({ nome, telefone }) {
    const r = await this.collection.insertOne({ nome, telefone });
    return this.findById(r.insertedId.toString());
  }

  async update(id, { nome, telefone }) {
    if (!ObjectId.isValid(id)) return null;
    const r = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nome, telefone } }
    );
    if (r.matchedCount === 0) return null;
    return this.findById(id);
  }

  async remove(id) {
    if (!ObjectId.isValid(id)) return false;
    const r = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return r.deletedCount > 0;
  }
}

module.exports = { MongoContatoRepository };
