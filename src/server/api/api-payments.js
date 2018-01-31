const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/payments', (req, res, next) => getPayments(req, res).catch(next));
app.post('/api/payment', (req, res, next) => sendPayment(req, res).catch(next));

module.exports = app;

async function getPayments(req, res) {
  let payments = await lnd.client.listPayments({});
  res.send({ payments });
}

async function sendPayment(req, res) {
  let { payment_request } = req.body;

  let call = lnd.client.sendPayment({});
  call.on('data', m => {
    console.log(m);
    res.send({});
  });
  call.write({
    payment_request,
  });
}
