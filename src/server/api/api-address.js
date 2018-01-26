const express = require('express');
const lnd = require('../lnd');
const app = express();

app.post('/api/address', (req, res, next) => createAddress(req, res).catch(next));

module.exports = app;

async function createAddress(req, res) {
  let type = parseInt(req.body.type);
  let address = await lnd.client.newAddress({ type });
  res.send({ address });
}
