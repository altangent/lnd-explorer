const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/transactions', (req, res, next) => getTransactions(req, res).catch(next));

module.exports = app;

async function getTransactions(req, res) {
  let { page = 1, pagesize = 25, sortBy = 'num_confirmations', sortDir = 'asc' } = req.query;
  let transactions = await lnd.client.getTransactions({});
  let txs = limit(sort(transactions.transactions, sortBy, sortDir), page, pagesize);
  res.send({ txs });
}

function sort(items, sortBy, sortDir) {
  items = items.slice();
  items.sort((a, b) => {
    if (sortDir === 'asc' && a[sortBy] > b[sortBy]) return 1;
    if (sortDir === 'asc' && a[sortBy] < b[sortBy]) return -1;
    if (sortDir === 'asc' && a[sortBy] === b[sortBy]) return 0;
    if (sortDir === 'desc' && a[sortBy] > b[sortBy]) return -1;
    if (sortDir === 'desc' && a[sortBy] < b[sortBy]) return 1;
    if (sortDir === 'desc' && a[sortBy] === b[sortBy]) return 0;
  });
  return items;
}

function limit(items, page, pagesize) {
  page = Math.max(1, (typeof page === 'number' ? page : parseInt(page)) || 1);
  pagesize = Math.max(1, (typeof pagesize === 'number' ? pagesize : parseInt(pagesize)) || 1);
  return items.slice((page - 1) * pagesize, pagesize);
}
