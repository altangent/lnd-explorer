const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/channels', (req, res, next) => getChannels(req, res).catch(next));
app.post('/api/channels', (req, res, next) => createChannel(req, res, next).catch(next));
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

async function createChannel(req, res, next) {
  let { target_peer_id, local_funding_amount, push_sat } = req.body;

  target_peer_id = parseInt(target_peer_id);
  local_funding_amount = parseInt(local_funding_amount);
  push_sat = push_sat ? parseInt(push_sat) : undefined;

  let conn = await lnd.client.openChannel({
    target_peer_id,
    local_funding_amount,
    push_sat,
  });

  conn.on('data', data => console.log('data', data));
  conn.on('status', status => console.log('status', status));
  conn.on('error', next);
  res.send({});
}

async function closeChannel(req, res, next) {
  let { channel_point } = req.body;
  let force = false;

  let [funding_txid_str, output_index] = channel_point.split(':');

  channel_point = {
    funding_txid: reverse(Buffer.from(funding_txid_str, 'hex')),
    output_index: parseInt(output_index),
  };

  let conn = await lnd.client.closeChannel({ channel_point, force });
  conn.on('data', data => console.log('data', data));
  conn.on('status', status => console.log('status', status));
  conn.on('error', next);
  res.send({});
}

function reverse(buffer) {
  let res = Buffer.alloc(buffer.length);
  for (let i = 0; i < buffer.length; i++) {
    res[i] = buffer[buffer.length - i - 1];
  }
  return res;
}
