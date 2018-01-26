const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/payments', (req, res, next) => getPayments(req, res).catch(next));

module.exports = app;

async function getPayments(req, res) {
  let payments = await lnd.client.listPayments({});
  res.send({ payments });
}
