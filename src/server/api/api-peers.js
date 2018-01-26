const express = require('express');
const app = express();
const lnd = require('../lnd');

app.get('/api/peers', (req, res, next) => getPeers(req, res).catch(next));
app.delete('/api/peers', (req, res, next) => disconnectPeer(req, res).catch(next));
app.post('/api/peers', (req, res, next) => connectPeer(req, res).catch(next));

module.exports = app;

async function getPeers(req, res) {
  let peers = await lnd.client.listPeers({});
  res.send({ peers: peers.peers });
}

async function disconnectPeer(req, res) {
  let pub_key = req.params.pub_key;
  await lnd.client.disconnectPeer({ pub_key });
  res.send({});
}

async function connectPeer(req, res) {
  let [pubkey, host] = req.body.addr.split('@');
  let perm = req.body.perm || true;
  let addr = {
    pubkey,
    host,
  };
  await lnd.client.connectPeer({ addr, perm });
  res.send({});
}
