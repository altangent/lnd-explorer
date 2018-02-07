const express = require('express');
const lnd = require('../lnd');
const wss = require('../wss');
const app = express();

app.get('/api/payments', (req, res, next) => getPayments(req, res).catch(next));
app.post('/api/payment', (req, res, next) => sendPayment(req, res).catch(next));
app.post('/api/payment/decode', (req, res, next) => decodePayment(req, res).catch(next));

module.exports = app;

async function getPayments(req, res) {
  let payments = await lnd.client.listPayments({});
  res.send({ payments });
}

async function sendPayment(req, res) {
  let { payment_request } = req.body;

  let call = lnd.client.sendPayment({});
  call.write({
    payment_request,
  });
  wss.subscribeSendPayment(call);
  res.send({});
}

async function decodePayment(req, res) {
  let { payment_request } = req.body;
  console.log(payment_request);
  let result = await lnd.client.decodePayReq({ pay_req: payment_request });
  res.send(result);
}
