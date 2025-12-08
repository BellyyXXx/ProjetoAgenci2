import express from "express";
import {
  Cliente,
  Reserva,
  Pagamento,
  Servico,
  ItemReserva,
  Avaliacao,
} from "./database/tables.js";

const app = express();


app.use(express.json());

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll();
    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/servicos', async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/itens', async (req, res) => {
  try {
    const itens = await ItemReserva.findAll();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/avaliacoes', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll();
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/reservas', async (req, res) => {
  try {
    const dadosReserva = {
      ...req.body,
      status: req.body.status || 'PENDENTE'
    };
    
    const reserva = await Reserva.create(dadosReserva);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/pagamentos', async (req, res) => {
  try {
    const pagamento = await Pagamento.create(req.body);
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/servicos', async (req, res) => {
  try {
    const servico = await Servico.create(req.body);
    res.status(201).json(servico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/itemreserva', async (req, res) => {
  try {
    const dadosItemReserva = {
      ...req.body,
      QuantServices: req.body.QuantServices || req.body.QuantServicos,
      servicold: req.body.servicold || req.body.servicoId
    };
    
    const itemReserva = await ItemReserva.create(dadosItemReserva);
    res.status(201).json(itemReserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/avaliacoes', async (req, res) => {
  try {
    const avaliacao = await Avaliacao.create(req.body);
    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', async (req, res) => {
  try {
    const cliente = await Cliente.create({
      nome: "Cibelly Silva",
      nascimento: "2001-02-15",
      email: "cibelly@ifmg.edu.br",
      senha: "123456",
      genero: "F",
      cpf: "12345678900",
      telefone: "33999999999"
    });

    const reserva = await Reserva.create({
      data_reserva: new Date(),
      valorTotal: 349.90,
      status: "PENDENTE",
      pagamento: "PIX",
      clienteId: cliente.id
    });

    const servico = await Servico.create({
      nome: "Passeio em Capitólio",
      categoria: "Turismo de aventura",
      descricao: "Inclui barco, guia e almoço.",
      preco: 199.99,
      duracao: "6h"
    });

    const item = await ItemReserva.create({
      valorTotal: 199.99,
      QuantServicos: 1,
      Observacoes: "Trazer roupa de banho",
      reservaId: reserva.id,
      servicoId: servico.id
    });

    const avaliacao = await Avaliacao.create({
      nota: 5,
      comentario: "Foi incrível!",
      clienteId: cliente.id,
      servicoId: servico.id
    });

    const pagamento = await Pagamento.create({
      valor: 738.80,
      forma_pagamento: "PIX",
      data: "2025-07-31T15:00:00"
    });

    res.send("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados:", error.message);
    res.status(500).send(`Erro: ${error.message}`);
  }
});

app.listen(80, () => {
  console.log('Servidor escutando na porta 80...');
});