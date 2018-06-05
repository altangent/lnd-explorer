const express = require('express');
const lnd = require('../lnd');
const wss = require('../wss');
const app = express();

app.get('/api/channels', (req, res, next) => getChannels(req, res).catch(next));
app.post('/api/channels', (req, res, next) => openChannel(req, res, next).catch(next));
app.delete('/api/channels', (req, res, next) => closeChannel(req, res, next).catch(next));

module.exports = app;

async function getChannels(req, res) {
  let [openChannels, pendingChannels] = await Promise.all([
    lnd.client.listChannels({}),
    lnd.client.pendingChannels({}),
  ]);

  let channelBalance = openChannels.channels.length
    ? openChannels.channels.map(p => parseInt(p.local_balance)).reduce((a, b) => a + b)
    : 0;

  res.send({ openChannels: openChannels.channels, pendingChannels, channelBalance });
}

async function openChannel(req, res) {
  let { node_pubkey_string, local_funding_amount, push_sat } = req.body;

  local_funding_amount = parseInt(local_funding_amount);
  push_sat = push_sat ? parseInt(push_sat) : undefined;

  let conn = await lnd.client.openChannel({
    node_pubkey: Buffer.from(node_pubkey_string, 'hex'),
    local_funding_amount,
    push_sat,
  });
  wss.subscribeOpenChannel(conn);
  res.send({ ok: true });
}

async function closeChannel(req, res) {
  let { channel_point, force = false } = req.body;

  let [funding_txid_str, output_index] = channel_point.split(':');

  channel_point = {
    funding_txid_str,
    output_index: parseInt(output_index)
  };

  let conn = await lnd.client.closeChannel({ channel_point, force });
  wss.subscribeCloseChannel(conn);
  res.send({});
}
