const express = require('express');
const lnd = require('../lnd');
const app = express();

app.post('/api/message/sign', (req, res, next) => signMessage(req, res).catch(next));
app.post('/api/message/verify', (req, res, next) => verifyMessage(req, res).catch(next));

module.exports = app;

async function signMessage(req, res) {
  let { msg } = req.body;
  let msgBytes = Buffer.from(msg);
  let result = await lnd.client.signMessage({ msg: msgBytes });
  res.send(result);
}

async function verifyMessage(req, res) {
  let { msg, signature } = req.body;
  let msgBytes = Buffer.from(msg);
  let result = await lnd.client.verifyMessage({ msg: msgBytes, signature });
  res.send(result);
}
