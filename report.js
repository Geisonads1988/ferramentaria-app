const db = require('./db');

// Função para carregar registros com base na data
function loadRelatorio(data) {
  const tbody = document.querySelector('#relatorio tbody');
  tbody.innerHTML = '';

  const query = data
    ? `SELECT * FROM movimentacoes WHERE date(data_hora) = ?`
    : `SELECT * FROM movimentacoes`;

  db.all(query, data ? [data] : [], (err, rows) => {
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

// Carregar todos os registros ao iniciar
loadRelatorio();

// Filtrar registros por data
document.getElementById('filtrar').addEventListener('click', () => {
  const dataFiltro = document.getElementById('dataFiltro').value;
  loadRelatorio(dataFiltro);
});