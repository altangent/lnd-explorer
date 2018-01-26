const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/home', (req, res, next) => getHomeInfo(req, res).catch(next));

module.exports = app;

async function getHomeInfo(req, res) {
  let [info, walletBalanceAll, walletBalanceWitness, channelBalance] = await Promise.all([
    lnd.client.getInfo({}),
    lnd.client.walletBalance({ witness_only: false }),
    lnd.client.walletBalance({ witness_only: true }),
    lnd.client.channelBalance({}),
  ]);
  res.send({ info, walletBalanceAll, walletBalanceWitness, channelBalance });
}
