const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ferramentaria.db');

// Criar tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data_hora TEXT,
      matricula TEXT,
      nome TEXT,
      ferramenta TEXT,
      acao TEXT
    )
  `);
});

module.exports = db;