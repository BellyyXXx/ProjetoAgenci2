import { DataTypes } from "sequelize";
import mysql from "./mysql.js";

// CLIENTE
const Cliente = mysql.define('Cliente', {
  nome: DataTypes.STRING,
  nascimento: DataTypes.DATEONLY,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  genero: DataTypes.ENUM('M', 'F', 'O'),
  cpf: DataTypes.STRING,
  telefone: DataTypes.STRING
});

// RESERVA
const Reserva = mysql.define('Reserva', {
  data_reserva: DataTypes.DATE,
  valorTotal: DataTypes.DECIMAL,
  status: DataTypes.ENUM('PENDENTE', 'CONFIRMADA', 'CANCELADA'),
  pagamento: DataTypes.STRING
  
});

// PAGAMENTO
const Pagamento = mysql.define('Pagamento', {
  valor: DataTypes.DECIMAL,
  forma_pagamento: DataTypes.STRING,
  data: DataTypes.DATE
});

// SERVIÇO
const Servico = mysql.define('Servico', {
  nome: DataTypes.STRING,
  categoria: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  preco: DataTypes.DECIMAL(10, 2),
  duracao: DataTypes.STRING
});

// ITEM RESERVA
const ItemReserva = mysql.define('ItemReserva', {
  valorTotal: DataTypes.DECIMAL(10, 2),
  QuantServicos: DataTypes.INTEGER,
  Observacoes: DataTypes.TEXT
});

// AVALIAÇÃO
const Avaliacao = mysql.define('Avaliacao', {
  nota: DataTypes.INTEGER,
  comentario: DataTypes.TEXT
});

// DESTINO
const Destino = mysql.define('Destino', {
  nome: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  cidade: DataTypes.STRING,
  pais: DataTypes.STRING
});

// SERVIÇO DESTINO
const ServicoDestino = mysql.define('ServicoDestino', {}); // Tabela associativa (many-to-many)

// COMPANHIA AÉREA
const CompanhiaAerea = mysql.define('CompanhiaAerea', {
  nome: DataTypes.STRING,
  codigoIATA: DataTypes.STRING
});

// AEROPORTO
const Aeroporto = mysql.define('Aeroporto', {
  nome: DataTypes.STRING,
  cidade: DataTypes.STRING,
  sigla: DataTypes.STRING,
  terminais: DataTypes.STRING});

// SERVIÇO VOO
const ServicoVoo = mysql.define('ServicoVoo', {
  horaPartida: DataTypes.TIME,
  horaChegada: DataTypes.TIME
});

// AGENDAMENTO DE VOO
const AgendamentoVoo = mysql.define('AgendamentoVoo', {
  DataPartida: DataTypes.DATE,
  DataChegada: DataTypes.DATE
});


// RELACIONAMENTOS

// Cliente → Reserva (1:N)
Cliente.hasMany(Reserva, { foreignKey: 'clienteId' });
Reserva.belongsTo(Cliente, { foreignKey: 'clienteId' });

// Reserva → Pagamento (1:N)
Reserva.hasMany(Pagamento, { foreignKey: 'reservaId' });
Pagamento.belongsTo(Reserva, { foreignKey: 'reservaId' });

// Reserva → ItemReserva (1:N)
Reserva.hasMany(ItemReserva, { foreignKey: 'reservaId' });
ItemReserva.belongsTo(Reserva, { foreignKey: 'reservaId' });

// Serviço → ItemReserva (1:N)
Servico.hasMany(ItemReserva, { foreignKey: 'servicoId' });
ItemReserva.belongsTo(Servico, { foreignKey: 'servicoId' });

// Cliente → Avaliação (1:N)
Cliente.hasMany(Avaliacao, { foreignKey: 'clienteId' });
Avaliacao.belongsTo(Cliente, { foreignKey: 'clienteId' });

// Serviço → Avaliação (1:N)
Servico.hasMany(Avaliacao, { foreignKey: 'servicoId' });
Avaliacao.belongsTo(Servico, { foreignKey: 'servicoId' });

// Serviço ↔ Destino (N:M)
Servico.belongsToMany(Destino, { through: ServicoDestino, foreignKey: 'servicoId' });
Destino.belongsToMany(Servico, { through: ServicoDestino, foreignKey: 'destinoId' });

// Serviço → ServicoVoo (1:N)
Servico.hasMany(ServicoVoo, { foreignKey: 'servicoId' });
ServicoVoo.belongsTo(Servico, { foreignKey: 'servicoId' });

// CompanhiaAerea → ServicoVoo (1:N)
CompanhiaAerea.hasMany(ServicoVoo, { foreignKey: 'companhiaId' });
ServicoVoo.belongsTo(CompanhiaAerea, { foreignKey: 'companhiaId' });

// Aeroporto → ServicoVoo (Origem e Destino)
Aeroporto.hasMany(ServicoVoo, { foreignKey: 'aeroportoOrigemId', as: 'VoosOrigem' });
Aeroporto.hasMany(ServicoVoo, { foreignKey: 'aeroportoDestinoId', as: 'VoosDestino' });
ServicoVoo.belongsTo(Aeroporto, { foreignKey: 'aeroportoOrigemId', as: 'Origem' });
ServicoVoo.belongsTo(Aeroporto, { foreignKey: 'aeroportoDestinoId', as: 'Destino' });

// ServicoVoo → AgendamentoVoo (1:N)
ServicoVoo.hasMany(AgendamentoVoo, { foreignKey: 'servicoVooId' });
AgendamentoVoo.belongsTo(ServicoVoo, { foreignKey: 'servicoVooId' });


// mysql.sync({ alter: true });

export {
  Cliente,
  Reserva,
  Pagamento,
  Servico,
  ItemReserva,
  Avaliacao,
  Destino,
  ServicoDestino,
  CompanhiaAerea,
  Aeroporto,
  ServicoVoo,
  AgendamentoVoo,
  mysql
};
