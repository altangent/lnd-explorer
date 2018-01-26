const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/invoices', (req, res, next) => getInvoices(req, res).catch(next));
app.post('/api/invoices', (req, res, next) => createInvoice(req, res).catch(next));
app.post('/api/payment', (req, res, next) => payInvoice(req, res).catch(next));

module.exports = app;

async function getInvoices(req, res) {
  let pending_only = req.query.pending_only == 'true';
  let invoices = await lnd.client.listInvoices({ pending_only: false });
  invoices.invoices.forEach(p => {
    p.description_hash = p.description_hash.toString('hex');
    p.r_hash = p.r_hash.toString('hex');
    p.r_preimage = p.r_preimage.toString('hex');
    p.receipt = p.receipt.toString('hex');
  });
  res.send({ invoices });
}

async function createInvoice(req, res) {
  let { memo, value } = req.body;
  await lnd.client.addInvoice({ memo, value });
  res.send({});
}

async function payInvoice(req, res) {
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
