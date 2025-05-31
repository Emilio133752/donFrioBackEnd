const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  imagem: { type: String },
  categoria: { type: String, required: true },
  destaque: { type: Boolean, default: false },
  descricao: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Produto', ProdutoSchema);
