const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/transactions', (req, res, next) => getTransactions(req, res).catch(next));

module.exports = app;

async function getTransactions(req, res) {
  let transactions = await lnd.client.getTransactions({});
  res.send({ transactions });
}
