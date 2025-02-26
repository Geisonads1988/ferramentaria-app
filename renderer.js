const db = require('./db');

document.getElementById('toolForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const matricula = document.getElementById('matricula').value;
  const nome = document.getElementById('nome').value;
  const ferramenta = document.getElementById('ferramenta').value;
  const dataHora = new Date().toLocaleString();
  const acao = 'Retirada'; // Pode ser ajustado para "Devolução"

  db.run(
    `INSERT INTO movimentacoes (data_hora, matricula, nome, ferramenta, acao) VALUES (?, ?, ?, ?, ?)`,
    [dataHora, matricula, nome, ferramenta, acao],
    (err) => {
      if (err) return console.error(err.message);

      alert('Movimentação registrada com sucesso!');
      loadMovimentacoes();
    }
  );
});

function loadMovimentacoes() {
  const tbody = document.querySelector('#movimentacoes tbody');
  tbody.innerHTML = '';

  db.all(`SELECT * FROM movimentacoes WHERE date(data_hora) = date('now')`, [], (err, rows) => {
    if (err) return console.error(err.message);

    rows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.data_hora}</td>
        <td>${row.matricula}</td>
        <td>${row.nome}</td>
        <td>${row.ferramenta}</td>
        <td>${row.acao}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}
document.getElementById('openReport').addEventListener('click', () => {
    const { BrowserWindow } = require('electron').remote;
    const path = require('path');
  
    const reportWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
  
    reportWindow.loadFile('report.html');
    reportWindow.on('closed', () => (reportWindow = null));
  });
// Carregar movimentações ao iniciar
loadMovimentacoes();