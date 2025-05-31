const express = require('express');
const router = express.Router();
const Produto = require('../models/Produtos');

router.get('/', async (req, res) => {
  try {
    const { categoria, precoMax, busca } = req.query;

    let filtro = {};

    if (categoria && categoria !== 'todos') {
      filtro.categoria = categoria;
    }

    if (precoMax) {
      filtro.preco = { $lte: parseFloat(precoMax) };
    }

    if (busca) {
      filtro.$or = [
        { nome: { $regex: busca, $options: 'i' } },
        { descricao: { $regex: busca, $options: 'i' } }
      ];
    }

    const produtos = await Produto.find(filtro);
    res.json(produtos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao salvar produto' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoRemovido) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao deletar produto' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produtoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar produto' });
  }
});


module.exports = router;
